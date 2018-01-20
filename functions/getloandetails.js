'use strict';
var bcSdk = require('../fabcar/query');
const user = require('../models/loandetails');


exports.getloandetails = (startKey,endKey) => {
    
   return new Promise((resolve, reject) => {
        console.log("startKey---",startKey);
        console.log("endKey---",endKey);
        console.log("entering into readAllrequest function.......!")
        
       bcSdk.getloandetails({
            startKey: startKey,
            endKey:endKey
        })

       .then((requestarray) => {
            console.log("data in requestArray" + requestarray)

           return resolve({
                status: 200,
                query: requestarray
            })
        })

       .catch(err => {

           if (err.code == 401) {

               return reject({
                    status: 401,
                    message: 'cant fetch !'
                });

           } else {
                console.log("error occurred" + err);

               return reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            }
        })
    })
}; 





