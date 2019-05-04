const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient; // connect online
// const uri = "link"; // connect online


const productSchema = new mongoose.Schema({
    name: String,
    // user_Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    user_Id: String,
    // catalog_Id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Catalog'
    // },
    catalog_Id: String,
    price: Number,
    discount: Number,
    info: String,
    image_link: String,
    // status : Number,
    createAt: {
        type: Date,
        default: new Date(),
    },
    view: {
        type: Number,
        default: 0,
    },
    like: {
        type: Array,
        default: 0,
    },
});

// function updateProductByID(id, name, info, price, link,url,type,catalog_Id) { // user
//     MongoClient.connect(uri, function(err, db) {

//       if (err) throw err;
//       const dbo = db.db("weima");
//       dbo.collection("product").update({
//         ID: id
//       }, {
//         $set: {
//           name: name,
//           info: info,
//           price: price,
//           link: link,
//           url:url,
//           type:type,
//           catalog_Id:catalog_Id,
//         }
//       }, {
//         multi: true
//       });
//           db.close();
//     });
//   }


//   function removeProductByID(id) { // user
//     MongoClient.connect(uri, function(err, db) {

//       if (err) throw err;
//       const dbo = db.db("weima");
//       dbo.collection("product").remove({
//         ID: id
//       });
//           db.close();
//     });
//   }

const productModel = mongoose.model('product', productSchema);
// module.exports.updateProductByID =updateProductByID;
// module.exports.removeProductByID =removeProductByID;
module.exports = productModel;