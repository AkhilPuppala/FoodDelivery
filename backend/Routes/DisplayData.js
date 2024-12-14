const express = require('express');
const router = express.Router();
const logger = require('../../logger/logging.js');

// Route: Food Data
router.post('/foodData', (req, res) => {
    try {
        if (!global.food_items || !global.foodCategory) {
            logger.warn('Global food data or categories are missing');
            return res.status(500).json({ error: 'Food data not available' });
        }

        logger.info('Food data fetched successfully', {
            foodItemCount: global.food_items.length,
            categoryCount: global.foodCategory.length
        });
        res.send([global.food_items, global.foodCategory]);
    } catch (error) {
        logger.error('Error fetching food data', { error: error.message });
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
