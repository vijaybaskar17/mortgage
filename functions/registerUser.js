'use strict';

const registerpage = require('../models/registerpage');



exports.registerUser = (email, password,  usertype,firstname,lastname,gender,age,phonenumber,dateofbirth) => {

return new Promise((resolve, reject) => {
    console.log("entering reg function")

    const newdetail= new registerpage({

        email: email,
        password: password,
        firstname: firstname,
        lastname:lastname,
        gender:gender,
        age:age,
        dateofbirth: dateofbirth,
        phonenumber:phonenumber,
        usertype: usertype
        
    });
    newdetail
        .save()
        .then(() => resolve({status: 201, message: 'registration successful'}))
        .catch(err => {

            if (err.code == 11000) {

                reject({status: 409, message: 'User Already Registered !'});

            } else {

                reject({status: 500, message: 'Internal Server Error !'});
            }
        });
    });
};