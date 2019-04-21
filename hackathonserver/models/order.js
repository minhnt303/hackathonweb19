const mongoose =require('mongoose');
const Schema =mongoose.Schema;
// const MongoClient =require('mongoose').MongoClient;
// const uri = "link"

const orderSchema = new Schema({
    ID:String,
    transaction_id:String,
    product_id:String,
    qty:String,
    amount:String,
    data:String,
    status:Number,

});


// function orderCount(callback) {
//     MongoClient.connect(uri, function(err, db) {
//       if (err) throw err;
//       const dbo = db.db("weima");
//       dbo.collection("order").find().count(function(err, result) {
//         if (err) {
//           throw err;
//           console.log(err);
//         }
//         else{
//           callback(result);
//         }
//       });
//       db.close();
//     });
//   }
  
//   function orderCollection(callback) {
//     MongoClient.connect(uri, function(err, db) {
//       if (err) throw err;
//       const dbo = db.db("weima");
//       dbo.collection("order").find().toArray(function(err, result) {
//         if (err) {
//           throw err;
//           console.log(err);
//         } else if (result.length > 0) {
//           callback(result);
//         }
//       });
//       db.close();
//     });
//   }

// function statistical(list, type) {
//     const count = 0;
//     const temp = list.filter(x => x.item.type === type);
//     for (let j = 0; j < temp.length; j++) {
//       count = temp[j].quantity;
//     }
//     return count
//   }
  

const orderModel =mongoose.model('order',orderSchema);
module.exports=orderModel;