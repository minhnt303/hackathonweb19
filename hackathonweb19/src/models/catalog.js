const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogSchema =new Schema({
    ID:String,
    name:String,
    parent_Id:String,
    sort_order:String,//ví trí sắp xếp hiển thị(phân vân bỏ)
});


module.exports= catalogModel;