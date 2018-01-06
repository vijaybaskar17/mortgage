'use strict';
// const bc_client = require('../blockchain_sample_client'); const bcrypt =
// require('bcryptjs');
var bcSdk = require('../fabcar/invoke.js');

exports.updatetransaction = (requestid,transactionstring) => {
return new Promise((resolve, reject) => {

    const updatetransaction = ({
        requestid:requestid,
        transactionstring: transactionstring,
        
    });
    console.log("Entering in to the update transaction function");
    bcSdk
        .updatetransaction({
            TransactionDetails: updatetransaction
        })
        .then((result) => {
            console.log("result of update"+result)
            return resolve({
            status: 201,
            message: 'Updated successfully'
        })
    }).catch(err => {
            log("error occured");
            if (err.code == 11000) {
                reject({
                    status: 409,
                    message: 'some error !'
                });
            } else {
                console.log("error occurred" + err);
                reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            }
        });
});

}

/*'use strict';

var express = require('express');
var router = express.Router();
var cors = require('cors');
var bodyParser = require('body-parser');
var bcSdk = require('../invoke');

exports.updateRequest = (requestid, status, transactionString) =>
    new Promise((resolve, reject) => {
        
        console.log("entering into updateRequest function.......!")
        
        const updateRequest = ({
            requestid: requestid,
            status: status,
            transactionString: transactionString,
        })
        
        bcSdk.updateRequest({ user: user, RequestDetails: updateRequest })

        .then(() => resolve({ "status": 200, "message": "request updated Successfully" }))

        .catch(err => {

            if (err.code == 401) {

                reject({ "status": 401, "message": 'Request Already updated!' });

            } else {
                console.log("error occurred" + err);

                reject({ "status": 500, "message": 'Internal Server Error !' });
            }
        });
    });*/