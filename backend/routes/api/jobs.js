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
const job = require("../../db/models/job");

const router = express.Router();


// route to delete a job posting
router.delete('/:job_id', asyncHandler( async (req, res) => {
    const { job_id } = req.params;

    const job = await Job.findOne({
        where: {
            id: +job_id 
        }
    })

    const userId = job.poster_id;

    const applications = await Application.findAll({
        where: {
            job_id: +job_id 
        }
    })

    const saves = await Save_for_Later.findAll({
        where: {
            job_id: +job_id 
        }
    })

    const requirements = await Requirement.findAll({
        where: {
            job_id: +job_id
        }
    })

    if (saves.length) {
        saves.forEach(async save => {
            await save.destroy()
        })
    }

    if (applications.length) {
        applications.forEach(async app => {
            await app.destroy()
        })
    }

    if (requirements.length) {
        requirements.forEach(async req => {
            await req.destroy()
        })
    }

    await job.destroy()
    return res.json({ job_id, userId })

}))

// route to create a new job posting
router.post('/', asyncHandler( async (req, res) => {
    const { title, description, pay, company_id, location, poster_id, requirements } = req.body;

    const job = await Job.create({
        title, 
        description,
        location,
        pay,
        company_id,
        poster_id
    })

    requirements.forEach( async req => {
        await Requirement.create({
            requirement: req,
            job_id: job.id
        })
    })

    const newJob = await Job.findOne({
        where: {
            id: +job.id
        },
        include: { all: true }
    })

    return res.json({ newJob })
}))

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