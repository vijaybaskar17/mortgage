'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerpageSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    firstname: String,
    lastname: String,
    gender: String,
    age: Number,
    phonenumber: Number,
    usertype: String,
    dateofbirth: Number
});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

mongoose.connect('mongodb://harini:Harini!96@ds119406.mlab.com:19406/mortgage', {
    useMongoClient: true
});



module.exports = mongoose.model('registerpage', registerpageSchema);