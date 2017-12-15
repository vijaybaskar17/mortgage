'use strict';

const  loanpage = require('../models/loandetails');
//const user = require('../models/fetchdata');



exports.loandetails = (requestid,loan) => {
    
return new Promise((resolve, reject) => { 
   

    const newloanpage = new loanpage({

           // userid: userid,
           requestid: requestid,
           loanobject:loan
            
        
    });
    newloanpage.save()
        .then((result) => resolve({status: 201, message: 'success'}))
        .catch(err => {

            if (err.code == 11000) {

                reject({status: 409, message: 'already they are having loan application!'});

            } else {

                reject({status: 500, message: 'Internal Server Error !'});
            }
        });
    });
};
