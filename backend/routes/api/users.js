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

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

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

// Initial data haul or route for every refresh
router.get('/:user_id', asyncHandler( async (req, res) => {
    const { user_id } = req.params;
    let company;
    let user;

    if (user_id) {
      user = await User.findOne({
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
          { model: Component }
        ]
      })
    }
    return res.json({ user })
}))

router.get('/job_search/:params', asyncHandler( async (req, res) => {
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
    }
  })


  return res.json({ jobResults })
}))

module.exports = router;