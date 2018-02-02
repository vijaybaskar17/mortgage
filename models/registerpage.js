'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerpageSchema = mongoose.Schema({

    firstname: String,
    lastname: String, 
    mobilenumber : Number,
    dateofbirth : String,
    emailid : {
        type: String,
        unique: true
    },
    password: String,
    retypepassword: String,
     
});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

mongoose.connect('mongodb://harini:Harini!96@ds119406.mlab.com:19406/mortgage', {
    useMongoClient: true
});



module.exports = mongoose.model('registerpage', registerpageSchema);