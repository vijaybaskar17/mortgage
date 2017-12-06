'use strict';


const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var Photo = mongoose.Schema({
    url: {
        type: String,
        length: 255
    },

    userid: String

});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://harini:Harini!96@ds119406.mlab.com:19406/mortgage', { useMongoClient: true });
module.exports = mongoose.model('files', Photo);
