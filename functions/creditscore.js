'use strict';

const user = require('../models/user');

exports.creditscore = (requestid) => new Promise((resolve, reject) => {
    var creditscore = "";
    var possible = "0123456789674736728367382772898366377267489457636736273448732432642326734"
    for (var i = 0; i < 3; i++)
        creditscore+= (possible.charAt(Math.floor(Math.random() * possible.length))).toString();
    console.log("creditscore" + creditscore)
    
        const newUser = new user({
            requestid:requestid,
            creditscore: creditscore
            
        });
        newUser
            .save()
            .then(() => resolve({status: 201, message: 'credit score generated',creditscore:creditscore}))
            .catch(err => {
    
                    reject({status: 500, message: err});
                })
            });

    