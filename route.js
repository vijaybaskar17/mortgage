'use strict';

const creditscore = require('./functions/creditscore');
const login = require('./functions/login');
const jwt = require('jsonwebtoken');
const registerUser = require('./functions/registerUser');
const loan = require('./functions/loan');
const getloandetails = require('./functions/getloandetails');
const getdetailsuser = require('./functions/getdetailsuser');
const getparticulardetails = require('./functions/getparticulardetails');
const getHistory = require('./functions/getHistory');
const readRequest = require('./functions/readRequest');
const preclosing = require('./functions/preclosing');
const loanschedule = require('./functions/loanschedule');
const getloanschedule = require('./functions/getloanschedule');
const approveloan = require('./functions/approveloan');
const updatetransaction = require('./functions/updatetransaction');
const savetransaction = require('./functions/savetransaction');
const readIndex = require('./functions/readIndex');

var cors = require('cors');
var mongoose = require('mongoose');

var Promises = require('promise');
var cloudinary = require('cloudinary').v2;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var Photo = require('./models/document');
var path = require('path');



module.exports = router => {

    router.post('/creditscore', cors(), (req, res) => {

        console.log("credit....>>>", req.body);
        console.log("entering register function in functions ");
        const requestid = parseInt(req.body.records);
        console.log(requestid);



        creditscore
            .creditscore(requestid)
            .then(result => {

                console.log("res123----", result);
                res.status(result.status).json({
                    message: "credit score generated ",
                    creditscore: result.creditscore


                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));

    });


    router.post('/registerUser', cors(), (req, res) => {

        const firstname = req.body.firstname;
        console.log(firstname);
        const lastname = req.body.lastname;
        console.log(lastname);
        const phonenumber = parseInt(req.body.phonenumber);
        console.log(phonenumber);
        const dateofbirth = req.body.dateofbirth;
        console.log(dateofbirth);
        const email = req.body.email;
        console.log(email);
        const password = req.body.password;
        console.log(password);
        const retypepassword = req.body.retypepassword;
        console.log(retypepassword);
        const usertype = req.body.usertype;
        console.log(usertype);


        if (!firstname || !lastname || !phonenumber || !dateofbirth || !email || !password || !retypepassword || !usertype) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            registerUser
                .registerUser(firstname, lastname, phonenumber, dateofbirth, email, password, retypepassword, usertype)
                .then(result => {

                    res.send({
                        "message": "user has been registered successfully",
                        "status": true,


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
                require('crypto').randomBytes(48, function(err, buffer) {
                    var token = buffer.toString('hex');
                    //expiresIn: 60000000000;
                    console.log("token....123>>>",token);
                    console.log("result ===>>>",result.users.usertype)
                    
                    
                                    res.send({
                                        "message": "Login Successful",
                                        "status": true,
                                        "usertype":result.users.usertype,
                                        "token":token
                                    });
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
        console.log("req123..", req.body)
        const id = req.query['requestid'];
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
                photo.requestid = id;
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

        console.log("req123..", req.body)
        const id = req.query['requestid'];
        console.log(id)

        //     console.log("req123...",req.body)
        //     const id = req.body.requestid
        //    console.log("id" + id);
        Photo
            .find({
                "requestid": id
            })
            .then((images) => {
                console.log("enter in to the photo", images);
                var image = [];
                console.log("length", images.length);
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
        console.log("body========>", req.body)
        // const requestid = req.body.requestid;
        // console.log("line number 203----->",requestid);
        var requestid = "";
        var possible = "0123456789674736728367382772898366377267489457636736273448732432642326734"
        for (var i = 0; i < 3; i++)
            requestid += (possible.charAt(Math.floor(Math.random() * possible.length))).toString();
        console.log("requestid" + requestid)
        var transactionstring = req.body.transactionstring;
        console.log("line number 212-------->", transactionstring)


        //  loan.loandetails(requestid, transactionstring)
        if (checkToken(req)) {

        savetransaction.savetransaction(requestid, transactionstring)

            .then(result => {

                console.log(result);
                res.send({
                    "message": result.message,
                    "requestid": requestid,
                    "status": true


                });
            })

            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
        }
        else {
            res
            .status(401)
            .json({
                message: 'cant fetch data !'
            });
        }

    });

    router.get('/getdetailsuser', cors(), (req, res) => {

        getdetailsuser
            .getdetailsuser()

            .then(function(result) {
                console.log("result---", result)

                res.send({
                    status: result.status,
                    message: result.usr
                });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));


    });


    router.get('/getparticulardetails', cors(), (req, res) => {
        if (1 == 1) {

            const requestid1 = checkToken(req);
            console.log("requestid1", requestid1);
            const requestid = requestid1;


            getparticulardetails.getparticulardetails(requestid)
                .then(function(result) {
                    console.log("requestid1", requestid1)
                    console.log("result.query", result.query)
                    return res.json({
                        "status": 200,
                        "message": result.query
                    });
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        } else {
            res.status(401).json({
                "status": false,
                message: 'cant fetch data !'
            });
        }
    });

    router.get('/getHistory', (req, res) => {
        console.log("requ...123>>>ui>>>", req.body);
        const requestid1 = checkToken(req);
        console.log("requestid1", requestid1);
        const requestid = requestid1;

        getHistory.getHistory(requestid)
            .then(result => {
                console.log("result....123>>>", result);
                res.status(result.status).json({
                    result: result.docs,
                    Date: result.recorddate,
                    Time: result.recordtime,
                    Date1: result.recorddate1,
                    Time1: result.recordtime1,
                    Date2: result.recorddate2,
                    Time2: result.recordtime2,
                    Date3: result.recorddate3,
                    Time3: result.recordtime3,
                    Date4: result.recorddate4,
                    Time4: result.recordtime4,
                    Date5: result.recorddate5,
                    Time5: result.recordtime5,
                    Date6: result.recorddate6,
                    Time6: result.recordtime6,
                    Date7: result.recorddate7,
                    Time7: result.recordtime7,
                    Date8: result.recorddate8,
                    Time8: result.recordtime8,
                    Date9: result.recorddate9,
                    Time9: result.recordtime9,
                    Date10: result.recorddate10,
                    Time10: result.recordtime10,
                    Date11: result.recorddate11,
                    Time11: result.recordtime11,
                    Date12: result.recorddate12,
                    Time12: result.recordtime12,
                    Date13: result.recorddate13,
                    Time13: result.recordtime13,
                    Date14: result.recorddate14,
                    Time14: result.recordtime14,
                    Date15: result.recorddate15,
                    Time15: result.recordtime15,
                    Date16: result.recorddate16,
                    Time16: result.recordtime16


                })
            })

            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
    })


    router.post('/savetransaction', cors(), (req, res) => {
        var name = req.body.name;
        var transactionstring = JSON.stringfy(req.body.transactionstring);
        var requestid = req.body.requestid;

        savetransaction
            .savetransaction(name, transactionstring, requestid)
            .then(function(result) {
                console.log(result)

                res.send({

                    message: "entered successfully"
                });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));


    });


    router.post('/approveloan', cors(), (req, res) => {
        console.log(req.body)
        const requestid = req.body.id;
        console.log(requestid);
        const transactionstring = req.body.transactionstring;
        console.log(transactionstring);
        console.log("legal..123>>>", transactionstring.legal)

        if (transactionstring.legal == "approved") {

            res
                .status(200)
                .json({
                    message: 'Your Request has been approved !'
                });

        } else {
            res
                .status(200)
                .json({
                    message: 'Your Request has been rejected !'
                });
        }

        updatetransaction
            .updatetransaction(requestid, transactionstring)
            .then(result => {
                console.log("result....", result)

            })
    });


    router.get("/readRequest", (req, res) => {
        //    var requestList = [];

        if (checkToken(req)) {
            

            const requestid = checkToken(req);
            console.log("requestid1", requestid);
            const requestid1 = requestid;


            readRequest.readRequest(requestid)
                .then(function(result) {
                    readAlldata = result.query;
                    console.log("readAlldata ---", readAlldata);
                    return res.json({
                        "status": 200,
                        "message": result.query
                    });
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        } else {
            res.status(401).json({
                "status": false,
                message: 'cant fetch data !'
            });
        }
    });

    router.post('/preclosingUser', cors(), (req, res) => {

        const requestid = req.body.requestid;
        console.log(requestid);

        const emiremaining = req.body.emiremaining;
        console.log(emiremaining);

        const penaltyforclosure = req.body.penaltyforclosure;
        console.log("penalty", penaltyforclosure);

        const installmentpermonth = req.body.installmentpermonth;
        console.log(installmentpermonth);
        const documentrequiredforclosing = req.body.documentrequiredforclosing;
        console.log(documentrequiredforclosing);
        const paymentmode = req.body.paymentmode;
        console.log(paymentmode);

        if (!requestid || !emiremaining || !penaltyforclosure || !installmentpermonth || !documentrequiredforclosing || !paymentmode) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            preclosing
                .preclosingUser(requestid, emiremaining, penaltyforclosure, installmentpermonth, documentrequiredforclosing, paymentmode)
                .then(result => {

                    res.send({
                        "message": "preclosing request accepted",
                        "status": true,

                    });


                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }))
        }
    });

    /*  router.post('/loanscheduleUser', cors(), (req, res) => {

            console.log("ui....123>>>",req.body);
            const requestid = req.body.requestid;
            console.log(requestid);
            const transactionstring = req.body.transactionstring;
            console.log(transactionstring);
            
                     loanschedule
                         .loanscheduleUser(requestid,transactionstring)

                            .then(result => {
                                if(!requestid) {
                                    res
                                    .status(400)
                                    .json({
                                        message: 'Invalid Request !'
                                    });
                                } 
                                else {
                                updatetransaction
                                .updatetransaction(requestid,transactionstring)
                                .then(function(result) {
                                    console.log("result....",result)                                    
                                res.send({
                                    "message": "loanschedule created successfully",
                                    "status": true,
            
                                });
            
            
                            })
                        
                            .catch(err => res.status(err.status).json({
                                message: err.message
                            }))
                        }
                        });
                    
                });  */

    router.post('/getloanschedule', cors(), (req, res) => {

        if (checkToken(req)) {
            
        console.log(req.body);
        console.log(req.body.requestid);
        var requestid = req.body.requestid;
        getloanschedule
            .getloanschedule(requestid)
            .then(function(result) {
                console.log(result)

                res.send({
                    status: result.status,
                    message: result.usr
                });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
        }
        else {
            res.status(401).json({
                "status": false,
                message: 'cant fetch data !'
            });
        }

    });

    router.get("/getloandetails", cors(), (req, res) => {



        var startKey = '000';
        console.log("startKey", startKey);
        var endKey = '999';
        console.log("endKey--", endKey);

        if (checkToken(req)) {
        getloandetails
            .getloandetails(startKey, endKey)
            .then(function(result) {
                console.log("  result.query1234..>>>", result.query);
                res.status(result.status).json({
                    message: result.query
                })
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
        }
        else {

            res.status(401).json({
                "status": false,
                message: 'cant fetch data !'
            });
        }


    });


    /* router.post('/creditscore', cors(), (req, res) => {
                                        console.log("entering in to the update trans",req.body);

                                        var body = req.body
                                        var requestid = body.id;
                                        var transactionstring = body.transactionstring;
                                        
                                        console.log("entering in to the upda trans",requestid,transactionstring);

                                            creditscore
                                            .creditscore(requestid)
                                            .then(results => {
                                               console.log("results123......>>>>",results.creditscore);
                                                var creditscore = results.creditscore
                                                console.log("transactionstring",transactionstring);
                                                console.log("transactionstring",req.body.creditscore);

                                                var updatedString = ""
                                                if(body.creditscore == ""){
                                                    console.log("creditscore ++++++++++>>>>>");
                                                updatedString= {
        
                                                    "creditscore":""
                                                } 
                                        
                                            }
                                            else{
                                                console.log("creditscore notnull ++++++++++>>>>>");
                                                
                                                updatedString= {

                                                    "creditscore": creditscore
                                                }
                                                
                                            
                                            } 
                                            updatetransaction
                                            .updatetransaction(requestid,updatedString)
                                            .then(function(result) {
                                                console.log("result....",result)                                    
                                
                                                res.send({
                                
                                                    message: result.message,
                                                    results:results.creditscore
                                                });
                                            })
                                        
                                            .catch(err => res.status(err.status).json({
                                                message: err.message
                                            }));
                                            
                                    })
                                        
                                    }); */


    router.post('/updatetransaction', cors(), (req, res) => {

        console.log("entering in to the update trans.....ui", req.body);

        var body = req.body
        var requestid = body.id;
        var transactionstring = body.transactionstring;
        console.log("entering in to the upda trans", requestid, transactionstring);

        if (checkToken(req)) {
        updatetransaction.updatetransaction(requestid, transactionstring)


            .then(result => {
                if (!requestid) {
                    res
                        .status(400)
                        .json({
                            message: 'Invalid Request !'
                        });
                }

                //console.log(result);
                else {
                    res.send({
                        "message": result.message,
                        "status": true


                    });
                }
            })

            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
        }
        else {
            res.status(401).json({
                "status": false,
                message: 'cant fetch data !'
            });
        }
    });



    router.get("/readIndex", cors(), (req, res) => {

        if (checkToken(req))  {

            readIndex
                .readIndex({})
                .then(function(result) {
                    console.log("result", result);
                    var firstrequest = result.query[0]
                    console.log("firstrequest--", firstrequest);
                    var length = result.query.length;
                    var lastrequest = result.query[length - 1];
                    console.log("lastrequest--", lastrequest);
                    console.log("query", result);

                    return res.json({
                        "status": 200,
                        "result": result
                    });
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        } else {
            res
                .status(401)
                .json({
                    "status": false,
                    message: 'cant fetch data !'
                });
        }
    });
    function checkToken(req) {

        const token = req.headers['X-access-token'];

        if (token) {

            try {
                (token.length != 0)
                return token
            } catch (err) {
                return false;
            }
        } else {
            return false;
        }
    }

}