const express = require('express');
const router = express.Router();
const TransportRequest = require('../models/TransportRequest');

// POST transport request
router.post('/', async (req, res) => {
    const transportRequest = new TransportRequest({
        crop: req.body.crop,
        quantity: req.body.quantity,
        pickup: req.body.pickup,
        destination: req.body.destination
    });
    try {
        const newRequest = await transportRequest.save();
        res.status(201).json({ message: 'Request submitted successfully', data: newRequest });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
