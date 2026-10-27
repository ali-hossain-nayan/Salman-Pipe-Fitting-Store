
import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
    try {
        // Image is optional
        const image_filename = req.file
            ? req.file.filename
            : "";

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();

        res.json({
            success: true,
            message: "Food Added Successfully."
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

// List all foods
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        res.json({
            success: true,
            data: foods
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

// Remove food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food item not found."
            });
        }

        // Delete the image only if one exists
        if (food.image) {
            const imagePath = `uploads/${food.image}`;

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: "Food Removed Successfully."
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

export { addFood, listFood, removeFood };
