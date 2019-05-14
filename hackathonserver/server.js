const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const expressSession = require('express-session');
const userModel = require('./models/user');
const productModel = require('./models/product');
var multer = require('multer')
var upload = multer({ dest: 'upload/' })

mongoose.connect('mongodb://localhost:27017/hackathonweb19', (err) => {
    if (err) {
        throw err;
    }
    console.log('connect to mongodb success')

    const app = express();

    app.use(express.static('public'));
    app.use('/upload', express.static('public'))
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(cors({
        origin: ['http://localhost:3000']
    }))



    
    app.get("/api/user", async (req, res) => {
        userModel.find({}, function (err, user) {
            if (err) {
                res.send('something aSSADASD')
                next();
            }
            res.json(user)
        })
    });

    app.post("/api/user", async (req, res) => {
        console.log(req.body);
        var user = new userModel(req.body);
        user.save(function (err, user) {
            res.json(user)
        })
    });

    app.get("/api/product", async (req, res) => {
        // productModel.find({}, function (err, product) {
        //     if (err) {
        //         res.send('something aSSADASD')
        //         next();
        //     }
        //     res.json(product)
        // })
        try {
            const { pageNumber, pageSize } = req.query;
            const totalRecord = await productModel.find().countDocuments();
            const data = await productModel.find({})
                .skip(pageSize * (pageNumber - 1))
                .limit(Number(pageSize))
                .exec();
            res.status(200).json(data)
        } catch (err) {
            res.status(500).end(err.message)
        }
    });

    app.get("/api/product2", async (req, res) => {
        // productModel.find({}, function (err, product) {
        //     if (err) {
        //         res.send('something aSSADASD')
        //         next();
        //     }
        //     res.json(product)
        // })
        try {
            const { pageNumber, pageSize } = req.query;
            const totalRecord = await productModel.find().countDocuments();
            const data = await productModel.find({})
                .skip(pageSize * (pageNumber - 1))
                .limit(Number(pageSize))
                .populate({path: 'user_Id', model: 'User'})
                .exec();
            res.status(200).json(data)
        } catch (err) {
            res.status(500).end(err.message)
        }
    });

    app.post("/api/product", upload.single('avatar'), async (req, res) => {
        console.log(req.body);
        var product = new productModel(req.body);
        product.save(function (err, product) {
            res.json(product)
        })
    });
    app.post('/upload', upload.single('avatar'), function (req, res) {
        console.log(`new upload = ${req.file.filename}\n`);
        console.log(req.file);
        const path = req.file.path.split('\\').join('/');
        console.log(path)
        res.json(req.file.filename);
    })

    app.get('/:imageid', async (req, res) => {
        const fs = require('fs');
        // const { imageid } = req.params;
        // console.log(imageid);
        // res.setHeader('Content-Type', storedMimeType)
        fs.createReadStream(path.join('upload/', req.params.imageid)).pipe(res)
    })

    app.get('/deleteimage/:imageid', async (req, res) => {
        const fs = require('fs');
        // const { imageid } = req.params;
        // console.log(imageid);
        // res.setHeader('Content-Type', storedMimeType)
        console.log('upload/' + req.params.imageid)
        const path = 'upload/' + req.params.imageid
        fs.unlink(path, (err) => {
            if (err) throw err;
            console.log('successfully deleted /tmp/hello');
        });
    })

    app.get("/updateprofile/:userId/:username&:facebooid&:zaloid&:phone&:address&:image", async (req, res) => {
        const { userId, username, facebooid, zaloid, phone, address, image } = req.params;
        console.log(userId, username, facebooid, zaloid, phone, address, image);
        const existedUser = await userModel.findById(userId).exec();
        if (!existedUser) {
            console.log(1)
            res.status(404).end('User not found');
        } else {
            await userModel.findByIdAndUpdate(userId, { $set: { username: username, fbId: facebooid, zaloId: zaloid, phone: phone, address: address, avatarUrl: image } }).exec();
            res.status(200).end('Update success')
        }
    })

    app.get("/updatepasswordprofile/:userId/:password", async (req, res) => {
        const { userId, password } = req.params;
        console.log(userId, password);
        const existedUser = await userModel.findById(userId).exec();
        if (!existedUser) {
            console.log(1)
            res.status(404).end('User not found');
        } else {
            await userModel.findByIdAndUpdate(userId, { $set: { password: password } }).exec();
            res.status(200).end('Update success')
        }
    })

    app.get("/updateavatarurl/:userId/:image", async (req, res) => {
        const { userId, image } = req.params;
        console.log(userId, image);
        const existedUser = await userModel.findById(userId).exec();
        if (!existedUser) {
            console.log(1)
            res.status(404).end('User not found');
        } else {
            await userModel.findByIdAndUpdate(userId, { $set: { avatarUrl: image } }).exec();
            res.status(200).end('Update success')
        }
    })

    app.get("/like/:productId/:userId", async (req, res) => {
        const { productId, userId } = req.params;
        const existedProductr = await productModel.findById(productId).exec();
        if (!existedProductr) {
            console.log(1)
            res.status(404).end('User not found');
        } else {
            await productModel.findByIdAndUpdate(productId, { $push: { like: userId } }).exec();
            res.status(200).end('Update success')
        }
    })

    app.get("/dislike/:productId/:userId", async (req, res) => {
        const { productId, userId } = req.params;
        const existedProductr = await productModel.findById(productId).exec();
        if (!existedProductr) {
            console.log(1)
            res.status(404).end('User not found');
        } else {
            await productModel.findByIdAndUpdate(productId, { $pull: { like: userId } }).exec();
            res.status(200).end('Update success')
        }
    })

    app.listen(3001, (err) => {
        if (err) throw err;
        console.log('Server is listen on post 3001..')
    });
});