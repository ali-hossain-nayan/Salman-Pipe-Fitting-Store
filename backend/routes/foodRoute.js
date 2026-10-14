import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();


// Image Storage Engine

// storage: This defines the storage configuration for multer.
// destination: 'uploads': Specifies the directory where uploaded files will be stored, in this case, a folder named uploads.
// filename: Specifies how the uploaded file's name should be structured.
// Date.now(): Adds a timestamp to the file name to make it unique.
// file.originalname: Uses the original name of the uploaded file.
// The resulting file name will be a combination of the current timestamp and the original file name (e.g., 1691834591203example.jpg).


const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
});

// upload: An instance of multer is created with the previously defined storage configuration. 
// This upload object will be used to handle file uploads in the routes.

const upload = multer({ storage: storage });


//api-endpoints
foodRouter.post('/add', upload.single('image'), addFood)
foodRouter.get('/list', listFood)
foodRouter.post('/remove',removeFood)

export default foodRouter