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



const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('first_name')
    .not()
    .isEmail()
    .withMessage('First name cannot be an email.'),
  check('last_name')
    .not()
    .isEmail()
    .withMessage('Last name cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

//Route to update users profile information
router.put('/update_profile/:user_id', asyncHandler( async (req, res) => {
  const { user_id } = req.params;
  const { background_image, profile_picture, first_name, last_name, email, location, current_job, description } = req.body;

  const user = await User.findOne({
    where: {
      id: +user_id 
    }
  })

  const update = await user.update({
    background_image,
    profile_picture,
    first_name,
    last_name,
    email,
    location,
    current_job,
    description
  })

  const newUser = await User.findOne({
    where: {
      id: +user_id 
    },
    include: [
      { 
        model: Job,
        include: { all: true }
      },
      {
        model: Company,
        include: { all: true }
      },
      {
        model: Post,
        include: { all: true }
      }
    ]
  })

  console.log("WTF IS HAPPENING", update, background_image, profile_picture)

  return res.json({ newUser })
}))


// Route to update users profile picture
router.put('/profile_picture/:user_id', singleMulterUpload('image'), asyncHandler( async (req, res) => {
  const { user_id } = req.params;

  const profile_picture = await singlePublicFileUpload(req.file);
  const user = await User.findOne({
    where: {
      id: +user_id
    }
  })

  return res.json({ profile_picture })
}))

// Route to update users background image 
router.put('/background_image/:user_id', singleMulterUpload('image'), asyncHandler( async (req, res) => {
  const { user_id } = req.params;

  const user = await User.findOne({
    where: {
      id: +user_id
    }
  })

  const background_image = await singlePublicFileUpload(req.file);

  return res.json({ background_image })
}))

// Sign up
router.post('', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    const user = await User.signup({ email, first_name, last_name, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Route to get other user information
router.get('/profile/:user_id', asyncHandler( async (req, res) => {
  const { user_id } = req.params;

  const user = await User.findOne({
    where: {
      id: +user_id
    },
    include: [
      { 
        model: Job,
        include: { all: true }
      },
      {
        model: Company,
        include: { all: true }
      },
      {
        model: Post,
        include: { all: true }
      }
    ]
  })

  return res.json({ user })
}))

// Initial data haul or route for every refresh
router.get('/:user_id', asyncHandler( async (req, res) => {
    const { user_id } = req.params;

    const user = await User.findOne({
      where: {
        id: +user_id
      },
      include: [
        { model: Follow,
          include: { all: true }
        },
        { model: Company,
        include: { all: true }
        },
        { model: Job,
          include: { all: true }
        },
        {
          model: Save_for_Later,
          include: { all: true }
        },
        {
          model: Application,
          include: { all: true }
        },
        { model: Conversation,
          include: [ User, Message ],
        },
        { model: Post,
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
          limit: 25
        },
        { model: Image },
        { model: Component },
        { 
          model: Team,
          include: { all: true }
        }
      ]
    })

    const app = await Application.findAll({
      where: {
        user_id: +user_id 
      },
      include: [
        { 
          model: Job,
          include: { all: true }
        }, 
        {
          model: User,
          include: { all: true } 
        }
      ]
    })

    const saves = await Save_for_Later.findAll({
      where: {
        user_id: +user_id 
      },
      include: [
        { 
          model: Job,
          include: { all: true }
        }, 
        {
          model: User,
          include: { all: true } 
        }
      ]
    })

    user.dataValues.Applications = app;
    user.dataValues.Save_for_Laters = saves;

    const posts = await Post.findAll({
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
          limit: 25
    })

    return res.json({ user, posts })
}))

router.get('/search/:params', asyncHandler( async (req, res) => {
  const params = req.params.params.toLowerCase().split(' ').concat(req.params.params.toUpperCase().split(' '));

  const jobResults = await Job.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.or]: {
                [Op.in]: params,
                [Op.substring]: req.params.params,
                [Op.iRegexp]: req.params.params

            }
          }
        },
        {
          location: {
            [Op.or]: {
                [Op.in]: params,
                [Op.substring]: req.params.params,
                [Op.iRegexp]: req.params.params

            }
          }
        },
      ]
    }, 
    include: { all: true },
    limit: 25
  })
  
  const userResults = await User.findAll({
    where: {
      [Op.or]: [
        {
          first_name: {
            [Op.or]: {
                [Op.in]: params,
                [Op.substring]: req.params.params,
                [Op.iRegexp]: req.params.params

            }
          }
        },
        {
          last_name: {
            [Op.or]: {
                [Op.in]: params,
                [Op.substring]: req.params.params,
                [Op.iRegexp]: req.params.params

            }
          }
        },
      ]
    }, 
    include: { all: true },
    limit: 25
  })
  
  const companyResults = await Company.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.or]: {
                [Op.in]: params,
                [Op.substring]: req.params.params,
                [Op.iRegexp]: req.params.params

            }
          }
        },
        {
          location: {
            [Op.or]: {
                [Op.in]: params,
                [Op.substring]: req.params.params,
                [Op.iRegexp]: req.params.params

            }
          }
        },
      ]
    }, 
    include: { all: true },
    limit: 25
  })
  return res.json({ jobResults, userResults, companyResults })
}))

module.exports = router;