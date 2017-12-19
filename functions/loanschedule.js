'use strict';

const loanuser = require('../models/loanschedule');  
// const user = require('../models/fetchdata');

exports.loanscheduleUser = (requestid,loanamount, loanterms,amountinterestrate,paymentperyear,installmentpermonth) => new Promise((resolve, reject) => {

    const loanUser = new loanuser({

        requestid: requestid,
        loanamount: loanamount,
        loanterms: loanterms,
        amountinterestrate:amountinterestrate,
        paymentperyear: paymentperyear,
        installmentpermonth: installmentpermonth,
       
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