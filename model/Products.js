const mongoose =require('mongoose');
const Schema = mongoose.Schema;
 
const prodSchema = new Schema({
    productId: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    hearts: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },


});

module.exports = mongoose.model('Products', prodSchema);