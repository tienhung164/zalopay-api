require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios').default; 
const CryptoJS = require('crypto-js'); 
const moment = require('moment'); 
const path = require('path')
const APP_ID=process.env.APP_ID
const KEY1=process.env.KEY1
const KEY2=process.env.KEY2

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const config = {
    app_id: APP_ID,
    key1: KEY1,
    key2: KEY2,
    endpoint1: "https://sb-openapi.zalopay.vn/v2/create",
    endpoint2: "https://sb-openapi.zalopay.vn/v2/query"
    
}

const embed_data = {};

const items = [{}];
const transID = Math.floor(Math.random() * 1000000);

const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    description: `Pallgree Shop - Payment for the order #${transID}`,
    bank_code: "zalopayapp"
};



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'view/createbill.html'))
})

app.post('/create',(req,res)=>{
    var url
    order.amount = req.body.amount
    let data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
     order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    console.log(config)
    console.log(order)
    axios.post(config.endpoint1, null, {params:order})
    .then(kq => {
       res.redirect(kq.data.order_url)
        
    })
    .catch(err => console.log(err));

   
})

app.get('/query',(req,res)=>{
    res.redirect('/alo')
})


app.listen(3000, function (){
    console.log('Server is listening at port :3000')
})
