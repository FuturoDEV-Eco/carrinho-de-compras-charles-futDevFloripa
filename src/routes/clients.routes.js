const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');

router.post('/clients', ClientController.createClient);

module.exports = router;
