const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    orderDetails: {
        name:{
          type: String,
          required: true
        },
        address:{
            type: String,
            required: true
          },
        status:{
            type: String,
            required: true
          },
    }
});

module.exports = mongoose.model('Orders', ordersSchema);