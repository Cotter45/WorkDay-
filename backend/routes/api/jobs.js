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


// route to update job postings
router.put('/:job_id', asyncHandler( async (req, res) => {
    const { job_id } = req.params;
    const { title, description, location, pay, company_id, poster_id, requirements } = req.body;

    const job = await Job.findOne({
        where: {
            id: +job_id
        }
    })

    const oldRequirements = await Requirement.findAll({
        where: {
            job_id: +job_id 
        }
    })

    if (oldRequirements.length) {
        oldRequirements.forEach( async req => {
            await req.destroy()
        })
        if (requirements.length) {
            requirements.forEach( async req => {
                await Requirement.create({
                    requirement: req,
                    job_id: +job_id
                })
            })
        }
    } else if (requirements.length) {
        requirements.forEach( async req => {
            await Requirement.create({
                requirement: req,
                job_id: +job_id
            })
        })
    }


    const updated_job = await job.update({
        title,
        description,
        location,
        pay,
        company_id,
        poster_id,
    })

    const user = await User.findOne({
    where: {
      id: +poster_id
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

    return res.json({ updated_job, user })
}))







module.exports = router;