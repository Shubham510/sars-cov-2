const express = require('express');
const router = express.Router();
const reports_controller = require('../../controllers/api/reports_controller');

router.get('/:status', reports_controller.getReports);

module.exports = router;