var bcSdk = require('../fabcar/query');
const user = require('../models/loandetails');
//const user = require('../models/fetchdata');

       
        exports.getHistory = (requestid) => {
                return new Promise((resolve, reject) => {
            
                   bcSdk.getHistory({
                        requestid:requestid
                        
                   })
            
                           // request.find({
                            //         "rapidID": rapidID
                            //     })
            
                               .then((docs) => {
                                    console.log("docs....123>>>",docs)
                                    console.log("recorddate",docs[0].Records.transactionlist[0].transactiondetails.date)
                                    console.log("recordtime",docs[0].Records.transactionlist[0].transactiondetails.time)
                                    
            
                                return resolve({
                                        status: 201,
                                        recorddate:docs[0].Records.transactionlist[0].transactiondetails.date,
                                        recordtime:docs[0].Records.transactionlist[0].transactiondetails.time
                                    })
                                })
                        })
                            
                       .catch(err => {
            
                           console.log("error occurred" + err);
            
                           return reject({
                                status: 500,
                                message: 'Internal Server Error !'
                            });
                        })
            
            };