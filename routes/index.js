const express = require('express');
const router = express.Router();
const regionController = require('../controllers/region.controller');

router.get('/',           regionController.findRegionsExample1);
router.get('/example2',   regionController.findRegionsExample2);
router.get('/example3',   regionController.findRegionsExample3);

/* ---------------------------- Insert Dummy Data --------------------------- */
router.get('/dummy-data', regionController.dummyData);

module.exports = router;
