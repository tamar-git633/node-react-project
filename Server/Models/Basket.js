const { default: mongoose } = require("mongoose")
const mogoose=require("mongoose")

const BasketScheme= new mogoose.Schema({
     products:[{
        barcode:String,
        name:String,
        amount:Number,
        price:Number
    }] 
    
},{timestamps:true})

 module.exports=mongoose.model("Basket",BasketScheme)

//  const mongoose = require('mongoose');
// const basketSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//       count: { type: Number, default: 0 }
//     }
//   ],
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Basket', basketSchema);