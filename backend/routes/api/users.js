const express = require("express");
const { check } = require("express-validator");
const { Op } = require('sequelize');

const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { singleMulterUpload, singlePublicFileUpload, multipleMulterUpload, multiplePublicFileUpload } = require("../../awsS3");


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
  Team,
  Task
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

// Route to delete an image
router.delete('/delete_image/:id', asyncHandler( async (req, res) => {
  const { id } = req.params;

  const image = await Image.findByPk(id);

  if (image) {
    await image.destroy();
    res.status(200).json({ message: "Image deleted successfully." });
  } else {
    res.status(404).json({ message: "Image not found." });
  }

}))

// Route to delete a task
router.delete('/delete_task/:task_id', asyncHandler( async (req, res) => {
  const { task_id } = req.params;
  const task = await Task.findByPk(task_id);
  await task.destroy();
  res.json({message: 'Task deleted successfully'});
}))


// Route to move a tasks position 
router.put('/move_tasks', asyncHandler( async (req, res) => {
  const { tasks } = req.body;
  let counter = 0;

  for (let i = 0; i < tasks.length; i++) {
    const task = await Task.findByPk(tasks[i].id);
    let position = tasks[i].position;
    try {
      await task.update({  position });
      counter++;
    } catch (error) {
      console.log(error);
    }
  }

  if (counter === tasks.length) {
    res.status(200).json({ message: "Tasks successfully moved." });
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }

}))

// Route to create a task
router.post('/create_task', multipleMulterUpload('imagesToUpload'), asyncHandler( async (req, res) => {
  const { title, priority, description, userId, position, requirements, imageLinks } = req.body;

  const uploadedImages = await multiplePublicFileUpload(req.files);

  const newTask = await Task.create({
    title,
    priority,
    description,
    userId,
    position,
    completed: false,
  });

  const newTaskId = newTask.id;

  let reqs;

  if (requirements.includes(',')) {
    reqs = requirements.split(',');
  } else {
    reqs = [requirements];
  }

  let newReqs = [];
  if (requirements && reqs.length > 0) {
    for (let requirement of reqs) {
      let req = await Requirement.create({
        task_id: +newTask.id,
        requirement,
      });
      newReqs.push(req);
    };
  }

  let newImages = [];
  if (uploadedImages.length > 0) {
    for (let image of uploadedImages) {
      let newImage = await Image.create({
        imageUrl: image,
        user_id: userId,
        task_id: +newTaskId,
      });
      newImages.push(newImage);
    }
  } 
  if (imageLinks.length > 0) {
    for (let image of imageLinks) {
      let newImage = await Image.create({
        imageUrl: image,
        user_id: userId,
        task_id: +newTaskId,
      });
      newImages.push(newImage);
    };
  }

  newTask.dataValues.Requirements = newReqs;
  newTask.dataValues.Images = newImages;

  return res.json({ newTask });
    
}))

// Route to mark a task as completed
router.post('/complete_task/:task_id', asyncHandler( async (req, res) => {
  const { task_id } = req.params;

  const task = await Task.findByPk(task_id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found."
    });
  } else if (!task.completed) {
    task.completed = true;
    await task.update( { completed: true } );
    return res.status(200).json({
      message: "Task completed."
    });
  } else {
    task.completed = false;
    await task.update( { completed: false } );
    return res.status(200).json({
      message: "Task marked as incomplete."
    });
  }
}))

// Route to fetch a users tasks
router.get('/get_tasks/:user_id', asyncHandler( async (req, res) => {
  const {user_id } = req.params;
  const tasks = await Task.findAll({
    where: {
      userId: +user_id,
    },
    include: [
      {
        model: Image
      }, 
      {
        model: Requirement
      }
    ]
  });
  return res.json({ tasks })
}))

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
      },
      {
        model: Task,
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
        { model: Conversation,
          include: [ User, Message ],
        },
        { model: Image },
        { model: Component },
        { 
          model: Team,
          include: { all: true }
        }
      ]
    })

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

// route for all job information
router.get('/jobs/:user_id', asyncHandler( async (req, res) => {
  const { user_id } = req.params;

  const user = await User.findOne({
    where: {
      id: +user_id
    }
  })

  const jobs = await Job.findAll({
      where: {
        poster_id: +user_id 
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
          model: User
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
          model: User
        }
      ]
    })

    user.dataValues.Applications = app;
    user.dataValues.Save_for_Laters = saves;
    user.dataValues.Jobs = jobs;

    return res.json({ user })
}))


// Route to search for jobs or users 
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
    limit: 25
  })
  
  // const companyResults = await Company.findAll({
  //   where: {
  //     [Op.or]: [
  //       {
  //         name: {
  //           [Op.or]: {
  //               [Op.in]: params,
  //               [Op.substring]: req.params.params,
  //               [Op.iRegexp]: req.params.params

  //           }
  //         }
  //       },
  //       {
  //         location: {
  //           [Op.or]: {
  //               [Op.in]: params,
  //               [Op.substring]: req.params.params,
  //               [Op.iRegexp]: req.params.params

  //           }
  //         }
  //       },
  //     ]
  //   }, 
  //   include: { all: true },
  //   limit: 25
  // })

  // companyResults
  return res.json({ jobResults, userResults })
}))

module.exports = router;