const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Route to place an order
router.post('/orderData', async (req, res) => {
    try {
        const { email, order_data, order_date } = req.body;

        // Validate request data
        if (!email || !order_data || !Array.isArray(order_data) || !order_date) {
            console.log('Validation failed');
            return res.status(400).json({ error: 'Invalid request data' });
        }
        console.log('Validation passed');

        // Add order date to the order data
        order_data.unshift({ Order_date: order_date });

        // Check if user already exists
        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            // Create new order for new user
            await Order.create({
                email,
                order_data: [order_data]
            });
            return res.status(201).json({ success: true });
        } else {
            console.log('Updating existing order');
            // Update existing order
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: order_data } }
            );
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error('Error placing order:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Route to get order data
router.post('/myOrderData', async (req, res) => {
    try {
        const { email } = req.body;

        // Validate request data
        if (!email) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        let orderData = await Order.findOne({ email });

        if (!orderData) {
            return res.status(404).json({ error: 'Orders not found' });
        }

        return res.status(200).json({ orderData });
    } catch (error) {
        console.error('Error fetching order data:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;


