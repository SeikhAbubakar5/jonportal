const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const { createJob, singleJob, showJobs } = require('../controllers/jobsController');






//user routes
///api/job/create
router.post('/job/create',isAuthenticated,createJob);

///api/job/:id
router.get('/job/:id',singleJob);
///api/job/show
router.get('/jobs/show',showJobs);
module.exports = router;
