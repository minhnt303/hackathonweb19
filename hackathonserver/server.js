const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const expressSession = require('express-session');
const userModel = require('./models/user');
const productModel = require('./models/product');
mongoose.connect('mongodb://localhost:27017/hackathonweb19', (err) => {
    if (err) {
        throw err;
    }
    console.log('connect to mongodb success')

    const app = express();

    app.use(express.static('public'));
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

    app.get("/api/product",async (req, res) => {
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

    app.post("/api/product", async (req, res) => {
        console.log(req.body);
        var product = new productModel(req.body);
        product.save(function (err, product) {
            res.json(product)
        })
    });

    app.listen(3001, (err) => {
        if (err) throw err;
        console.log('Server is listen on post 3001..')  
    });
});