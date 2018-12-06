'use strict';

var bcSdk = require('../fabcar/registerUser');
const  loanpage = require('../models/loandetails');

exports.registeru = (enrollmentID) => {
    return new Promise((resolve, reject) => {

    const newloanpage =new loanpage ({
        enrollmentID:enrollmentID 
    //     userId:userId,
    //    transactionstring: transactionstring,
        
        
   });

  // newloanpage.save()
   console.log("enrollmentID",enrollmentID);
   
bcSdk.register(enrollmentID)

   

   .then(() => resolve({
    status: 201,
    message: 'your enrolled successfully !'
}))
console.log("enter chaincode")

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