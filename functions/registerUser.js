
'use strict';

const user = require('../models/registerpage');  
// const user = require('../models/fetchdata');

exports.registerUser = (firstname, lastname, mobilenumber,dateofbirth,emailid,password, retypepassword) => new Promise((resolve, reject) => {

    const newUser = new user({

        firstname : firstname, 
        lastname : lastname, 
        mobilenumber : mobilenumber,
        dateofbirth : dateofbirth,
        emailid : emailid,
        password : password, 
        retypepassword : retypepassword
    });
    newUser
        .save()
        .then(() => resolve({
            status: 201,
            message: 'Please verify your emailid and phone no'
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