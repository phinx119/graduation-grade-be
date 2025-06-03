const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/', dataController.getAll);
router.get('/:year/:sbd', dataController.getById);

module.exports = router;