'use strict';

const  loanpage = require('../models/loandetails');



exports.loandetails = (userid,loan) => {
    


return new Promise((resolve, reject) => {

    const newloanpage = new loanpage({

            userid: userid,
            loanObject:loan,
        
    });
    newloanpage
        .save()
        .then(() => resolve({status: 201, message: 'loan application created'}))
        .catch(err => {

            if (err.code == 11000) {

                reject({status: 409, message: 'already they are having loan application!'});

            } else {

                reject({status: 500, message: 'Internal Server Error !'});
            }
        });
    });
};
