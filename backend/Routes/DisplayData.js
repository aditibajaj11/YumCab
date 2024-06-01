const express = require("express");
const router = express.Router();
const cors = require("cors"); // Import the cors package

router.use(cors()); // Add CORS middleware to the router

router.post("/foodData", (req, res) => {
    try {
        // Assuming global.food_items and global.foodCategory contain the data
        const responseData = {
            foodItems: global.food_items,
            foodCat: global.foodCategory // Changed to 'foodCat' to match frontend variable name
        };

        // Send the response with the data
        res.json(responseData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

