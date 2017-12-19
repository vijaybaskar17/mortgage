'use strict';

const user = require('../models/preclosing');  
// const user = require('../models/fetchdata');

exports.preclosingUser = (requestid,emiremaining,penaltyforpreclosure,installmentpermonth,documentrequiredforclosing,paymentmode) => new Promise((resolve, reject) => {

    const newUser = new user({
        requestid: requestid,
        emiremaining:emiremaining,
        penaltyforpreclosure: penaltyforpreclosure,
        installmentpermonth:installmentpermonth,
        documentrequiredforclosing:documentrequiredforclosing,
        paymentmode: paymentmode,
       
    });
    newUser
        .save()
        .then(() => resolve({
            status: 201,
            message: 'preclosing request accepted'
        }))
        .catch(err => {

            if (err.code == 11000) {

                reject({
                    status: 409,
                    message: 'User Already Registered !'
                });

            } else {

                reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            }
        });
});