const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const { createJobType, allJobType } = require('../controllers/jonTypeController');





//user routes
///api//type/create
router.post('/type/create',isAuthenticated,createJobType);
///api//type/jobs
router.get('/type/job',allJobType)

module.exports = router;
