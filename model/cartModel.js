const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref: "User", required: true},
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true},
  quantity: Number
});

const Cart= mongoose.model('Cart', productSchema);
module.exports=Cart