const express = require("express");
const { check } = require("express-validator");
const { Op } = require('sequelize');

const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");


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



const router = express.Router();


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
router.post('/', asyncHandler( async (req, res) => {
    const { description, image_url, poster_id, company_id } = req.body;

    const post = await Post.create({
        description, image_url, poster_id, company_id
    })

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
router.put('/:post_id', asyncHandler( async (req, res) => {
    const { post_id } = req.params;
    const { description, imageUrl } = req.body;

    const post = await Post.findOne({
        where: {
            id: +post_id
        }
    })

    await post.update({
        description,
        image_url: imageUrl
    })

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