const express = require("express");
const { check } = require("express-validator");
const { Op } = require('sequelize');

const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");


const { 
  User, 
  Application, 
  Comment, 
  Company_Industry,
  Company_Perk,
  Company,
  Component,
  Conversation_User,
  Conversation,
  Employee_Approval,
  Follow,
  Image,
  Industry,
  Job,
  Like,
  Message,
  Perk,
  Post,
  Project,
  Requirement,
  Review,
  Role,
  Save_for_Later,
  Team
 } = require("../../db/models");
const e = require("express");



const router = express.Router();

// router for deleting a comment
router.delete('/comments/:comment_id', asyncHandler( async (req, res) => {
    const { comment_id } = req.params;
    let post_id;

    const comment = await Comment.findOne({
        where: {
            id: +comment_id
        }
    })
    post_id = comment.post_id;

    await comment.destroy()

    return res.json({ comment_id, post_id })
}))


// router for editing a posts comment
router.put('/comments/:comment_id', singleMulterUpload('image'), asyncHandler( async (req, res) => {
    const { comment_id } = req.params;
    const { comment, image_url, user_id, post_id } = req.body;

    const findComment = await Comment.findOne({
        where: {
            id: +comment_id 
        }
    })
    
    if (image_url) {
        await findComment.update({
            comment,
            image_url,
            user_id: +user_id,
            post_id: +post_id 
        })
    } else {
        const newImage = await singlePublicFileUpload(req.file);
        await findComment.update({
            comment,
            image_url: newImage,
            user_id: +user_id,
            post_id: +post_id 
        })

    }

    const newPost = await Post.findOne({
        where: {
            id: +post_id 
        },
        include: [
            { model: User },
            { model: Company },
            {
              model: Comment,
              include: [ User, Like, Image ]
            },
            { 
              model: Like,
              include: [ User ]
            },
            { model: Image }
          ],
    })

    return res.json({ newPost })
}))


// route for commenting on a post
router.post('/:postId/comment', singleMulterUpload('image'), asyncHandler( async (req, res) => {
    const { postId } = req.params;
    const { comment, image_url, user_id } = req.body;

    let newComment;

    if (image_url) {
        newComment = await Comment.create({
            comment,
            image_url,
            post_id: +postId,
            user_id: +user_id
        })
    } else {
        const newImage = await singlePublicFileUpload(req.file);
        newComment = await Comment.create({
            comment,
            image_url: newImage,
            post_id: +postId,
            user_id: +user_id 
        })
    }

    const newPost = await Post.findOne({
        where: {
            id: +postId 
        },
        include: [
            { model: User },
            { model: Company },
            {
              model: Comment,
              include: [ User, Like, Image ]
            },
            { 
              model: Like,
              include: [ User ]
            },
            { model: Image }
          ],
    })
    return res.json({ newPost })
}))

// route to like or unlike a post
router.post('/like/:postId', asyncHandler( async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;


    const exists = await Like.findOne({
        where: {
            post_id: +postId,
            user_id: +userId
        }
    })

    if (!exists) {
        const like = await Like.create({
            user_id: +userId,
            post_id: +postId
        })
    } else {
        await exists.destroy();
    }


    const post = await Post.findOne({
        where: {
            id: +postId
        },
        include: [
            { model: User },
            { model: Company },
            {
              model: Comment,
              include: [ User, Like, Image ]
            },
            { 
              model: Like,
              include: [ User ]
            },
            { model: Image }
          ],
    })

    return res.json({ post })
}))


// route to delete a post
router.delete('/:postId', asyncHandler( async (req, res) => {
    const { postId } = req.params;

    
    const post = await Post.findOne({
        where: {
            id: +postId
        }
    })
    
    const comments = await Comment.findAll({
        where: {
            post_id: post.id
        }
    })
    
    const likes = await Like.findAll({
        where: {
            post_id: post.id
        }
    })
    
    if (likes.length) {
        likes.forEach( async like => {
            await like.destroy()
        })
    }

    if (comments.length) {
        comments.forEach( async comment => {
            await comment.destroy()
        })
    }

    await post.destroy();

    return res.json({ postId })
}))

// route for creating a new post
router.post('/', singleMulterUpload('image'), asyncHandler( async (req, res) => {
    const { description, image_url, poster_id, company_id } = req.body;

    let post;

    if (image_url || !req.file) {
        post = await Post.create({
            description, image_url, poster_id, company_id
        })
    } else {
        const image_url = await singlePublicFileUpload(req.file);
        post = await Post.create({
            description, image_url, poster_id, company_id
        })
    }

    const returnPost = await Post.findOne({
        where: {
            id: post.id
        },
        include: [
            { model: User },
            { model: Company },
            {
              model: Comment,
              include: [ User, Like, Image ]
            },
            { 
              model: Like,
              include: [ User ]
            },
            { model: Image }
          ],
    })

    return res.json({ returnPost })

}))

// route for updating an existing post
router.put('/:post_id', singleMulterUpload('image'), asyncHandler( async (req, res) => {
    const { post_id } = req.params;
    const { description, imageUrl } = req.body;

    const post = await Post.findOne({
        where: {
            id: +post_id
        }
    })

    if (imageUrl) {
        await post.update({
            description,
            image_url: imageUrl
        })
    } else {
        const image_url = await singlePublicFileUpload(req.file);
        await post.update({
            description,
            image_url
        })
    }

    const newPost = await Post.findOne({
        where: {
            id: +post_id
        },
        include: [
            { model: User },
            { model: Company },
            {
              model: Comment,
              include: [ User, Like, Image ]
            },
            { 
              model: Like,
              include: [ User ]
            },
            { model: Image }
          ],
    })

    return res.json({ newPost })
}))




module.exports = router;