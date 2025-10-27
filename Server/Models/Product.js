const mongoose=require("mongoose")

const ProductScheme=new mongoose.Schema({
    barcode:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    madeIn:String,
    designer:String,
    price:{
        type:Number,
        required:true,
        default:0
    },
    amount:{
        type:Number,
        default:0
    },
    isSale:{
        type:Boolean,
        default:false,
    },
     percents:{
        type:Number,
        default:0
     },
     img:String,
     rating:{
        type:Number,
        maxRating:5
     },
     category:{
        type: String,
        enum: ['חדרי בנים', 'חדרי בנות', 'חדרי שינה','סלונים', 'מטבחים'],
        required:true
     },
     
},{timestamps:true})

module.exports=mongoose.model("Product", ProductScheme)