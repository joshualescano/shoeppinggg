const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.json();
const mongoose = require('mongoose');

const multer = require('multer');
var jwt = require ('jsonwebtoken');

/////// test 1 //////////////////////////
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/assets/upload');
    },
    filename: function(req, file, cb) {
        const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};

const upload = multer({storage: storage, 
    limits:{
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}); 


app.use(express.static(__dirname + '/dist/shoepping'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/dist/shoepping/index.html');
});

const cors = require('cors');
app.use(cors());
app.use('/uploads', express.static('uploads')); 

//mongoose.connect('mongodb+srv://joshualescano:Akocjosh0831@cluster0-h6zxu.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true});
mongoose.connect('mongodb://localhost:27017/api', {useUnifiedTopology: true, useNewUrlParser: true});

// Make "public" Folder Publicly Available test 2
//app.use('/public', express.static('public'));

const Customer= mongoose.model('Customer', {
   username: {
   type: String,
   require: true
   },
   password: {
   type: String,
   require: true
   },
   cusfName: {
   type: String,
   require: true,
   },
   cuslName: {
   type: String,
   require: true,
   },
   address: {
   type: String,
   require: true,
   },
   birthday: {
       type: String,
       require: true,
       },
   phone: {
   type: Number,
   require: true,
   },
 //  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

const Product= mongoose.model('Product', {
    name: {
    type: String,
    require: true
    },
    brand: {
    type: String,
    require: true
    },
    price: {
    type: Number,
    require: true,
    },
    quantity: {
    type: Number,
    require: true,
    },
    image: {
    type: String,
    require: true,
    },
    description: {
        type: String,
        require: true,
        },
  //  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
 });


 const Order= mongoose.model('Order', {
    cusUsername: {
    type: String,
    require: true
    },
    prodName: {
    type: String,
    require: true
    },
    orderQuantity: {
    type: Number,
    require: true,
    },
    totalPrice: {
    type: Number,
    require: true,
    },
    buyNow: {
        type: Boolean,
        require: true,
        },
    approve: {
        type: Boolean,
        require: true,
    },
 });
 
app.get('/customer',verifyToken, (req, res) => {
    Customer.find({},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.post('/customer', urlEncoded, (req, res) => {
    var customer = new Customer({
        username: req.body.username,
        password: req.body.password,
        cusfName: req.body.cusfName,
        cuslName: req.body.cuslName,
        address: req.body.address,
        birthday: req.body.birthday,
        phone: req.body.phone
    });
    customer.save((err, data) => {
        if(err) {
            res.json({"msg":"Invalid Request"});
        }else{
            let payload = { subject: data.username }
            let token = jwt.sign(payload, 'roshy')
            res.status(200).send({token});
        }


    });
});

app.put('/customer/:id',verifyToken, urlEncoded, (req, res) => {
    Customer.updateOne({_id:req.params.id},{
      username: req.body.username,
      password: req.body.password,
      cusfName: req.body.cusfName,
      cuslName: req.body.cuslName,
      address: req.body.address,
      birthday: req.body.birthday,
      phone: req.body.phone
    }, (err, data) => {
        if(err) res.json({msg:'Invalid request'});
            res.json(data);
    });
});

app.delete('/customer/:id',verifyToken, (req, res) => {
    Customer.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    });
});

app.get('/customer/:username/:password', (req, res, next) =>{
    Customer.findOne({username:req.params.username, password:req.params.password},(err, 
        customer) => {
            if(err){
                res.json({ msg:"Invalid Request"});
            } else{
                if(!customer){
                    if(req.params.username == "admin123" && req.params.password == "admin123"){
                       var admin = req.params.username;
                        let payload = { subject: req.params.username }
                        let token = jwt.sign(payload, 'roshy')
                        res.status(200).send({token,msg:"admin"});
                    }
                    else{
                        res.json({ msg:"err"});  
                    }
                }else{
                    let payload = { subject: req.params.username }
                    let token = jwt.sign(payload, 'roshy')
                    res.status(200).send({token, customer,msg:"customer"});           
                }
            }
        });
}); 

//////////////// PRODUCT //////////////////////////

app.get('/product', (req, res) => {
    Product.find({},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.get('/product:id', (req, res) => {
    Product.findOne({_id:req.params.id},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.get('/search:brand', (req, res) => {
    Product.find({brand:req.params.brand},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});
app.get('/search:name', (req, res) => {
    Product.find({name:req.params.name},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

////////////// test 1////////////
app.post('/product', upload.single('image'),urlEncoded, (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    
   // var path = req.body.image;
   // var filename = path.replace(/^.*\\/, "");
   // console.log(filename);

    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
      //  image: '../assets/upload/' + req.file.image
    });
    product.save().then(result => {
      res.status(201).json({
        message: "User registered successfully!",
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
  }) 
  
app.put('/product/:id', urlEncoded,verifyToken, (req, res) => {
    Product.updateOne({_id:req.params.id},{
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.body.image,
        description: req.body.description,
    }, (err, data) => {
        if(err) res.json({msg:'Invalid request'});
            res.json(data);
    });
});

app.delete('/product/:id',verifyToken, (req, res) => {
    Product.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    });
});


/////////////////////// Order ////////////////////////////////////////
app.get('/order',verifyToken, (req, res) => {
    Order.find({buyNow:true,approve:false},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.get('/deliver',verifyToken, (req, res) => {
    Order.find({buyNow:true,approve:true},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.get('/order/:cusUsername',verifyToken, (req, res) => {
    Order.find({cusUsername:req.params.cusUsername,buyNow:false},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.post('/order',verifyToken, urlEncoded, (req, res) => {
    var order = new Order({
        cusUsername: req.body.cusUsername,
        prodName: req.body.prodName,
        orderQuantity: req.body.orderQuantity,
        totalPrice: req.body.totalPrice,
        buyNow: req.body.buyNow,
        approve: req.body.approve
    });
    order.save((err, data) => {
        if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.put('/order/:cusUsername',verifyToken, urlEncoded, (req, res) => {
    Order.updateMany({cusUsername:req.params.cusUsername},{
        buyNow:req.body.buyNow

    }, (err, data) => {
        if(err) res.json({msg:'Invalid request'});
            res.json(data);
    });
});

app.put('/approve/:id',verifyToken, urlEncoded, (req, res) => {
    Order.updateOne({_id:req.params.id,buyNow:true},{
        approve:req.body.approve

    }, (err, data) => {
        if(err) res.json({msg:'Invalid request'});
            res.json(data);
    });
});

app.delete('/order/:id',verifyToken, (req, res) => {
    Order.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    });
});


function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token, 'roshy')
    if(!payload){
        return res.status(401).send('Unauthorized Request')
    }
    req.username = payload.subject
    next()
}

const PORT = 80;
app.listen(PORT,(err) => {
    if(err) throw err;
    console.log(`Server running at port ${PORT}`);
    }
);