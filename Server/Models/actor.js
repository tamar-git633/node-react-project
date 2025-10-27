const mongoose=require("mongoose")

const actorScheme=new mongoose.Schema({
    name: String
}, {timestamps:true})

module.exports=mongoose.model("actor",actorScheme)