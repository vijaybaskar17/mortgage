
'use strict';

const user = require('../models/registerpage');

exports.registerUser = (email, password, usertype,firstname,lastname,dateofbirth,gender,age,phonenumber) => new Promise((resolve, reject) => {

    const newUser = new user({

        email: email,
        password: password,
        firstname: firstname,
        lastname:lastname,
        gender:gender,
        age:age,
        phonenumber:phonenumber,
        usertype: usertype,
        dateofbirth: dateofbirth,
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