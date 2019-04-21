const  mongoose = require('mongoose');

const catalogSchema =new mongoose.Schema({
    name:String,
});
const catalogModel =mongoose.model('Catalog',catalogSchema);

module.exports= catalogModel;