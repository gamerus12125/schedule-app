import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string)
        console.log("connected")
    } catch(error) {
        console.log("Erorr to connect")
    }
}