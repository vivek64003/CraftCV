import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ayushguptaxo22:resume123@cluster0.u6uavnh.mongodb.net/RESUME')
    .then(() => console.log("MongoDB connected successfully"))
}
