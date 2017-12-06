'use strict';

const creditscore = require('./functions/creditscore');
const login = require('./functions/login');
const registerUser = require('./functions/registerUser');
const loandetails = require('./functions/loandetails');
var cors = require('cors');
var mongoose = require('mongoose');

var Promises = require('promise');
var cloudinary = require('cloudinary').v2;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var Photo = require('./models/document');
var path = require('path');

module.exports = router => {
    
router.post('/creditscore', cors(), (req, res1) => {

    console.log("entering register function in functions ");
    const requestid = parseInt(req.body.requestid);
    console.log(requestid);
   
    creditscore
    .creditscore(requestid)
    .then(result => {


        res.status(result.status).json({
            message:"succeess"
        

        });

    })
    .catch(err => res.status(err.status).json({
        message: err.message
    }).json({
        status: err.status
    }));
      
});


    router.post('/registeruser', cors(), (req, res) => {

        const email = req.body.email;
        console.log(email);
       
        const password = req.body.password;
        console.log(password);
        
        const firstname = req.body.firstname;
        console.log(firstname);
        const lastname = req.body.lastname;
        console.log(lastname);
        const dateofbirth = parseInt(req.body.dateofbirth);
        console.log(dateofbirth);
        const gender = req.body.gender;
        console.log(gender);
        const age =parseInt(req.body.age);
        console.log(age);
        const phonenumber =parseInt(req.body.phonenumber);
        console.log(phonenumber);
        const usertype = req.body.usertype;
        console.log(usertype);

        
        if (!email || !password || !firstname || !lastname || !dateofbirth || !gender || !age || !phonenumber || !usertype) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            registerUser
                .registerUser(email, password, usertype,firstname,lastname,dateofbirth,gender,age,phonenumber )
                .then(result => {

                   return res
                        .status(result.status)
                        .json({
                            message: result.message,
                            email: email,
                            phone: phonetosend
                        });

                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
        }
    });

router.post('/login', cors(), (req, res) => {
    console.log("entering login function in functions ");
    const emailid = req.body.email;
    console.log(emailid);
    const passwordid = req.body.password;
    console.log(passwordid);
    login
    .loginUser(emailid, passwordid)
    .then(result => {


        res.status(result.status).json({
            message:" Login succeess"
        

        });

    })
    .catch(err => res.status(err.status).json({
        message: err.message
    }).json({
        status: err.status
    }));
      
}); 
cloudinary.config({
    cloud_name: 'diyzkcsmp',
    api_key: '188595956976777',
    api_secret: 'F7ajPhx0uHdohqfbjq2ykBZcMiw'
});

router.post('/UploadDocs', multipartMiddleware, function(req, res, next) {
    const id = req.headers['userid'];
    console.log(id)
    var photo = new Photo(req.body);
    console.log("req.files.image" + JSON.stringify(req.files));
    var imageFile = req.files.file.path;
   cloudinary
        .uploader
        .upload(imageFile, {
            tags: 'express_sample'
        })
        .then(function(image) {
            console.log('** file uploaded to Cloudinary service');
            console.dir(image);
            photo.url = image.url;
            photo.userid = id;
           // photo.claimno = claimno;
            // Save photo with image metadata
            return photo.save();
        })
        .then(function(photo) {

           res.send({
                url: photo._doc.url,
                //claimno: photo._doc.claimno,
                message: "files uploaded succesfully"
            });
        })
        .finally(function() {

           res.render('photos/create_through_server', {
                photo: photo,
                upload: photo.image
            });
        });
});

router.get('/images/id', cors(), (req, res) => {
    const id = req.body.userid
    console.log("id" + id);
    Photo
        .find({
            "userid": id
        })
        .then((images) => {
            var image = [];
            for (let i = 0; i < images.length; i++) {
                image.push(images[i]._doc)

           }

           res.send({
                images: image,
                message: "image fetched succesfully"
            });
        })

});  

router.post('/loandetails', cors(), (req, res) => {
    
            const id = req.body.userid;
            console.log(id);
            const _id=(req.body.transactionstring._id).tostring()
            var transaction = req.body.transactionstring;
            console.log(transaction)
            var loan = transaction.loandetails;
    
    });

    
}

