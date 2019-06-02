const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
  productId:{ type: String ,required: true},
  productName: { type: String, required: true },
  productModel: { type: String, required: true },
  productOffer: { type: String, required: true },
  cost: { type: Number, default: 0 , required: true},
  stock: { type: Number, default: 0 , required: true},
  sold: { type: Number, default: 0 ,required: true},
  balance: { type: Number, default: 0 ,required: true }
},
    {
      collection: 'product'
    })

const Product = mongoose.model('Product', productSchema)

module.exports = Product
