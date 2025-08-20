const mongoose=require("mongoose")
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database not connected",error.message)
        process.exit(1)
    }
}
module.exports=connectDB