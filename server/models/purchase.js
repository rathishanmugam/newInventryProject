const mongoose = require('mongoose')
const Schema = mongoose.Schema

let purchaseSchema = new Schema({
    purchaseNo: { type: String, required: true },
    productId: { type: String,required: true},
    customerName: { type: String, required: true },
    purchaseItem: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    offer: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    // paymentType: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now }
    },
    {
        collection: 'purchase'
    })


const purchase = mongoose.model('purchase', purchaseSchema)
module.exports = purchase
