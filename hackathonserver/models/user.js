
const mongoose = require('mongoose');
// const MongoClient= reqire('mongodb').MongoClient;//connect online
// uri = "link";connect online

//const pass;
const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    zaloId:String,
    phone:String,
    fbId:String,
    avatarUrl:String,
    createdAt:{
        type:Date,
        default:new Date(),
    },
    address:String,
});


// function userCollection(callback) {
// 	MongoClient.connect(uri, function(err, db) {
// 		if (err) throw err;
// 		const dbo = db.db("weima");
// 		dbo.collection("customer").find().toArray(function(err, result) {
// 			if (err) {
// 				throw err;
// 				console.log(err);
// 			} else if (result.length > 0) {
//         for(let i = 0; i< result.length; i++)
//         {
//           const bytes = crypto.AES.decrypt(result[i].password,'dudada');
//           pass = bytes.toString(crypto.enc.Utf8);
//           result[i].password = pass;
//         }
//         pass = null;
// 				callback(result);
// 			}
// 		});
//     db.close();
// 	});
// } 
//não có hạn các cao nhân và tài liệu cũng nhiều mong lợi sp

//sua
// function userUpdate(fistName,lastName,email,password,zaloId,phone,fbId,avatarUrl,adress) { // customer
//     pass = crypto.AES.encrypt(password,'dudada').toString();
//     password = pass;
//     pass = null;
//     console.log("password update: " +password);
//     MongoClient.connect(uri, function(err, db) {
//       if (err) throw err;
//       const dbo = db.db("weima");
//       dbo.collection("customer").update({
//         ID: id
//       }, {
//         $set: {
//           fistName: fistName,
//           lastName: lastName,
//           email: email,
//           password: password,
//           zaloId:zaloId,
//           phone:phone,
//           fbId:fbId,
//           avatarUrl: avatarUrl:
//           address: address,
//         }
//       }, {
//         multi: true
//       });
//       db.close();
//     });
// }


//xoa
// function userRemove(id) { // user
//     MongoClient.connect(uri, function(err, db) {
//       if (err) throw err;
//       const dbo = db.db("3dwebsite");
//       dbo.collection("user").remove({
//         ID: id
//       });
//       db.close();
//     });
//   }
const userModel = mongoose.model('User',UserSchema);


module.exports = userModel;
// module.exports.userCollection = userCollection;
// module.exports.userUpdate = userUpdate;
// module.exports.useromerRemove = userRemove;