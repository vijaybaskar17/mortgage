'use strict';
// const bc_client = require('../blockchain_sample_client'); const bcrypt =
// require('bcryptjs');
var bcSdk = require('../fabcar/invoke');
const  loanpage = require('../models/loandetails');

exports.savetransaction = (requestid,transactionstring) => {
    return new Promise((resolve, reject) => {

    const newloanpage =new loanpage ({
     
       requestid: requestid,
       transactionstring: transactionstring
        
        
   });

   newloanpage.save()
   
   
   

   .then(() => resolve({
    status: 201,
    message: 'your loan details entered successfully !'
}))

.then(() => bcSdk.savetransaction({ TransactionDetails: newloanpage})
)
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
}