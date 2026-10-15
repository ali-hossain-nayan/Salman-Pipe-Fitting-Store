// import mongoose from "mongoose";
// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://aliNayan:01690205129@cluster0.rzcnd.mongodb.net/khaiDai').then(() => {
//         console.log('DB Connected Successfully...')
//     })
// }


import mongoose from "mongoose";

let connectionPromise = null;

export const connectDB = async () => {
    // Reuse an existing MongoDB connection.
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // Reuse an ongoing connection attempt.
    if (connectionPromise) {
        return connectionPromise;
    }

    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        throw new Error("MONGO_URI environment variable is not configured");
    }

    connectionPromise = mongoose
        .connect(mongoURI)
        .then(() => {
            console.log("DB Connected Successfully...");
            return mongoose.connection;
        })
        .catch((error) => {
            connectionPromise = null;
            console.error("Database connection failed:", error.message);
            throw error;
        });

    return connectionPromise;
};