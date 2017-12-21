'use strict';
const  loanpage = require('../models/loandetails');

exports.approveloan = (approved) =>
    new Promise((resolve, reject) => {


        if("approved"==approved){
          var response="approved"
          console.log(response);
          
        }
        else{
            var response="rejected"
            console.log(response);
        }


     }) .then(() => resolve({
                status: 201,
                message: 'loan  approved Sucessfully !'
            }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({
                        status: 409,
                        message: ' loan closed !'
                    });

                } else {
                    console.log("error occurred" + err);

                    reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
                }
            });

