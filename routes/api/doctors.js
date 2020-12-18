const express = require('express');
const router = express.Router();
const doctors_controller = require('../../controllers/api/doctors_controller');


router.post('/register',doctors_controller.createUser);
router.post('/login',doctors_controller.createSession);


module.exports = router;