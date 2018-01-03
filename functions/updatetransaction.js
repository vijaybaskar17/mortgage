'use strict';
// const bc_client = require('../blockchain_sample_client'); const bcrypt =
// require('bcryptjs');
var bcSdk = require('../fabcar/invoke.js');

exports.updatetransaction = (requestid,transactionString) => new Promise((resolve, reject) => {
    const transactiondetails = ({
        requestid:requestid,
        transactionString: transactionString,
        
    });
    console.log("ENTERING THE CORE MODULE");
    bcSdk
        .updatetransaction({
            
            TransactionDetails: transactiondetails
        })
        .then(() => resolve({
            status: 201,
            message: 'Updated successfully'
        }))
        .catch(err => {
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