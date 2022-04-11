// Node v10.15.3
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const qs = require('qs')

const config = {
    app_id: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sb-openapi.zalopay.vn/v2/query"
};

let postData = {
    app_id: config.app_id,
    app_trans_id: "220411_42136", // Input your app_trans_id
}

let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


let postConfig = {
    method: 'post',
    url: config.endpoint,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
};

axios(postConfig)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });