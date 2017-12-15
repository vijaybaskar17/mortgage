
'use strict';

const user = require('../models/registerpage');  
// const user = require('../models/fetchdata');

exports.registerUser = (email, password, retypepassword,firstname,lastname,dateofbirth,phonenumber) => new Promise((resolve, reject) => {

    const newUser = new user({

        email: email,
        password: password,
        retypepassword:retypepassword,
        firstname: firstname,
        lastname:lastname,
        dateofbirth: dateofbirth,
        //gender:gender,
        phonenumber:phonenumber,
       
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