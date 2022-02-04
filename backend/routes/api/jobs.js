const express = require("express");
const { check } = require("express-validator");
const { Op } = require('sequelize');

const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");


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

// ADD routte for getting next 10 jobs in order

// Route for getting recently posted jobs
router.get("/recent", requireAuth, asyncHandler(async (req, res) => {
    const jobs = await Job.findAll({
        include: [
            {
            model: Application,
            include: { model: User }
            }, 
            {
            model: User,
            }, 
            { 
            model: Requirement,
            }, 
            {
            model: Company,
            }
        ],
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 10
    });
    return res.json({ jobs });
}));

// FIX - split these routes to adhere to SRP (Single Responsibility Principle)
// Route for saving a job posting 
router.post('/save/:job_id', requireAuth, asyncHandler( async (req, res) => {
    const { user_id, job_id } = req.body;

    const save = await Save_for_Later.findOne({
        where: {
            job_id: +job_id,
            user_id: +user_id 
        }
    })

    // if a saved job cant be found, then create one
    if (save === null) {
        await Save_for_Later.create({
            job_id: +job_id,
            user_id: +user_id 
        })
        const newSave = await Save_for_Later.findOne({
            where: {
                job_id: +job_id,
                user_id: +user_id
            },
            include: [
                {
                model: Job,
                include: {
                    model: User
                }
                }
            ]
        })
        return res.json({ newSave })
    } else {

        // if a saved job is found, delete it
        const id = save.id;
        await save.destroy();
        return res.json({ id });
    }
}))

// FIX - split these routes to adhere to SRP (Single Responsibility Principle)
// Route for applying to a job posting 
router.post('/apply/:job_id', requireAuth, asyncHandler( async (req, res) => {
    const { user_id, job_id } = req.body;

    
    const exists = await Application.findOne({
        where: {
            job_id: +job_id,
            user_id: +user_id
        }
    })

    // if the application is not found, create one
    if (!exists) {
        await Application.create({
            job_id: +job_id,
            user_id: +user_id
        })
        
        const job = await Application.findOne({
            where: {
                job_id: +job_id,
                user_id: +user_id 
            },
            include: [
                {
                    model: Job,
                    include: {
                        model: User
                    }
                }
            ]
        })
        
        return res.json({ job })
    } else if (exists) {

        // if the application is found, delete it
        const id = exists.id;
        await exists.destroy()

        return res.json({ id })
    }


}))

// route to delete a job posting
router.delete('/:job_id', requireAuth,  asyncHandler( async (req, res) => {
    const { job_id } = req.params;

    const job = await Job.findOne({
        where: {
            id: +job_id 
        }
    })

    const userId = job.poster_id;

    await job.destroy()
    return res.json({ job_id, userId })

}))

// FIX - split these routes to adhere to SRP (Single Responsibility Principle)
// route to create a new job posting
router.post('/', requireAuth,  asyncHandler( async (req, res) => {
    const { title, description, pay, company_id, location, poster_id, requirements } = req.body;

    const job = await Job.create({
        title, 
        description,
        location,
        pay,
        company_id,
        poster_id
    })

    if (requirements.length > 0) {
        for (let req of requirements) {
            await Requirement.create({
                requirement: req,
                job_id: +job.id
            })
        }
    }

    const newJob = await Job.findOne({
        where: {
            id: +job.id
        },
        include: [
            {
            model: Application,
            include: { model: User }
            }, 
            {
            model: User,
            }, 
            { 
            model: Requirement,
            }, 
            {
            model: Company,
            }
        ]
    })

    return res.json({ newJob })
}))

// FIX - refactor redux store to update a users jobs without having to fetch user model here
// FIX - split these routes to adhere to SRP (Single Responsibility Principle) and DRY (Dont Repeat Yourself)
// route to update job postings
router.put('/:job_id', requireAuth,  asyncHandler( async (req, res) => {
    const { job_id } = req.params;
    const { title, description, location, pay, company_id, poster_id, requirements } = req.body;

    const job = await Job.findOne({
        where: {
            id: +job_id
        },
        include: [
            {
                model: Requirement
            }
        ]
    })

    const oldRequirements = job.Requirements;

    if (oldRequirements.length) {
        for (let req of oldRequirements) {
            await req.destroy();
        }
        if (requirements.length) {
            for (let req of requirements) {
                await Requirement.create({
                    requirement: req,
                    job_id: +job_id
                })
            }
        }
    } else if (requirements.length) {
        for (let req of requirements) {
            await Requirement.create({
                requirement: req,
                job_id: +job_id
            })
        }
    }

    await job.update({
        title,
        description,
        location,
        pay,
        company_id,
        poster_id,
    })

    const updated_job = await Job.findOne({
        where: {
            id: +job.id
        },
        include: [
            {
            model: Application,
            include: { model: User }
            }, 
            {
            model: User,
            }, 
            { 
            model: Requirement,
            }, 
            {
            model: Company,
            }
        ]
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