const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    ID:String,
    status:Number,
    user_Id:String,
    user_email:String,
    user_phone:String,
    amount:String,
    payment:String,
    payment_info:String,
    message:String,//nội dung yêu cầu của khách
    create:{
        type:Date,
        default:Date(),
    }
});
const transactionModel=mongoose.model('transaction',transactionSchema);

module.exports=transactionModel;