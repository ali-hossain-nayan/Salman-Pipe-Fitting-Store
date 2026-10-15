// import mongoose from "mongoose";
// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://aliNayan:01690205129@cluster0.rzcnd.mongodb.net/khaiDai').then(() => {
//         console.log('DB Connected Successfully...')
//     })
// }


import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGODB_URI is not configured");
        }

        await mongoose.connect(mongoURI);

        console.log("DB Connected Successfully...");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
};