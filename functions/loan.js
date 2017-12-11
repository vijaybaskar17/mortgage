'use strict';

const  loanpage = require('../models/loandetails');



exports.loandetails = (loan) => {
    
return new Promise((resolve, reject) => { 
    var requestid    = "";
    var possible= "0123456789"
    for (var i=0; i<3;i++)
    requestid += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log("requestid"+requestid)

    const newloanpage = new loanpage({

           // userid: userid,
            loanobject:loan,
            requestid: requestid
        
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
