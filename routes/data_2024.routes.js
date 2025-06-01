const express = require('express');
const router = express.Router();
const data2024Controller = require('../controllers/data_2024.controller');

router.get('/', data2024Controller.getAll);
router.get('/:sbd', data2024Controller.getById);

module.exports = router;