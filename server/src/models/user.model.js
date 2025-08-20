const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true})
userSchema.pre("save",async function(next){
    try {
        if(!this.isModified("password")) return next()
        this.password=await bcrypt.hash(this.password,12)
         next()
    } catch (error) {
        console.log(error.message)
    }
})
userSchema.methods.checkPassword=async function(password)
{
    try {
       return  await  bcrypt.compare(password,this.password)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports=mongoose.model("User",userSchema)