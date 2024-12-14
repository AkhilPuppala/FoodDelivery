const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const logger = require('../../logger/logging');

// Route: Order Data
router.post('/orderData', async (req, res) => {
    const data = req.body.order_data;
    data.splice(0, 0, { order_date: req.body.order_date });

    try {
        const existingOrder = await Order.findOne({ email: req.body.email });

        if (!existingOrder) {
            // Create new order
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            logger.info('New order created successfully', { email: req.body.email });
            res.json({ success: true });
        } else {
            // Update existing order
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            logger.info('Order updated successfully', { email: req.body.email });
            res.json({ success: true });
        }
    } catch (error) {
        logger.error('Error handling order data', { error: error.message });
        res.status(500).json({ error: 'Server error' });
    }
});

// Route: My Orders
router.post('/myorder', async (req, res) => {
    try {
        const myData = await Order.findOne({ email: req.body.email });

        if (!myData) {
            logger.warn('No orders found for user', { email: req.body.email });
            return res.status(404).json({ error: 'No orders found' });
        }

        logger.info('Fetched user orders successfully', { email: req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        logger.error('Error fetching user orders', { error: error.message });
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
