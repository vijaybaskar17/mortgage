'use strict';

const  loanpage = require('../models/loandetails');  
// const user = require('../models/fetchdata');

exports.loanscheduleUser = (requestid,transactionstring) => new Promise((resolve, reject) => {

    const loanUser = new loanpage({

        requestid: requestid,
        transactionstring:transactionstring
       
    });
    loanUser
        .save()
        .then(() => resolve({
            status: 201,
            message: 'loan amount stored successfully'
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