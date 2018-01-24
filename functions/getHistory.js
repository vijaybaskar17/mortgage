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
                                   var len=docs.length;
                                   console.log(len)

                                   console.log("docs....123>>>",docs)
                                      console.log("recorddate",docs[0].Records.transactionlist[0].transactiondetails.date)
                                  console.log("recordtime...6>>>",docs[6].Records.transactionlist[1].transactiondetails.time)
                                console.log("recordtime.123.>>",docs[6].Records.transactionlist[6].transactiondetails.time)
                                    
            
                                return resolve({
                                        status: 201,
                                         //docs:docs,                                       
                                         recorddate:docs[0].Records.transactionlist[0].transactiondetails.date,
                                         recordtime:docs[0].Records.transactionlist[0].transactiondetails.time,
                                         recorddate1:docs[1].Records.transactionlist[0].transactiondetails.date,
                                         recordtime1:docs[1].Records.transactionlist[0].transactiondetails.time,
                                         recorddate2:docs[1].Records.transactionlist[1].transactiondetails.date,
                                         recordtime2:docs[1].Records.transactionlist[1].transactiondetails.time,
                                         recorddate3:docs[2].Records.transactionlist[0].transactiondetails.date,
                                         recordtime3:docs[2].Records.transactionlist[0].transactiondetails.time,
                                         recorddate4:docs[2].Records.transactionlist[1].transactiondetails.date,
                                         recordtime4:docs[2].Records.transactionlist[1].transactiondetails.time,
                                         recorddate5:docs[2].Records.transactionlist[2].transactiondetails.date,
                                         recordtime5:docs[2].Records.transactionlist[2].transactiondetails.time,
                                         recorddate6:docs[3].Records.transactionlist[0].transactiondetails.date,
                                         recordtime6:docs[3].Records.transactionlist[0].transactiondetails.time,
                                         recorddate7:docs[3].Records.transactionlist[1].transactiondetails.date,
                                         recordtime7:docs[3].Records.transactionlist[1].transactiondetails.time,
                                         recorddate8:docs[3].Records.transactionlist[2].transactiondetails.date,
                                         recordtime8:docs[3].Records.transactionlist[2].transactiondetails.time,
                                         recorddate9:docs[3].Records.transactionlist[3].transactiondetails.date,
                                         recordtime9:docs[3].Records.transactionlist[3].transactiondetails.time,
                                         recorddate10:docs[4].Records.transactionlist[0].transactiondetails.date,
                                         recordtime10:docs[4].Records.transactionlist[0].transactiondetails.time,
                                         recorddate11:docs[4].Records.transactionlist[1].transactiondetails.date,
                                         recordtime11:docs[4].Records.transactionlist[1].transactiondetails.time,
                                         recorddate12:docs[4].Records.transactionlist[2].transactiondetails.date,
                                         recordtime12:docs[4].Records.transactionlist[2].transactiondetails.time,
                                         recorddate13:docs[4].Records.transactionlist[3].transactiondetails.date,
                                         recordtime13:docs[4].Records.transactionlist[3].transactiondetails.time,
                                         recorddate14:docs[4].Records.transactionlist[4].transactiondetails.date,
                                         recordtime14:docs[4].Records.transactionlist[4].transactiondetails.time,
                                         recorddate15:docs[5].Records.transactionlist[0].transactiondetails.date,
                                         recordtime15:docs[5].Records.transactionlist[0].transactiondetails.time,
                                         recorddate16:docs[5].Records.transactionlist[1].transactiondetails.date,
                                         recordtime16:docs[5].Records.transactionlist[1].transactiondetails.time,
                                         recorddate17:docs[5].Records.transactionlist[2].transactiondetails.date,
                                         recordtime17:docs[5].Records.transactionlist[2].transactiondetails.time,
                                         recorddate18:docs[5].Records.transactionlist[3].transactiondetails.date,
                                         recordtime18:docs[5].Records.transactionlist[3].transactiondetails.time,
                                         recorddate19:docs[5].Records.transactionlist[4].transactiondetails.date,
                                         recordtime19:docs[5].Records.transactionlist[4].transactiondetails.time,
                                        // recorddate20:docs[5].Records.transactionlist[5].transactiondetails.date,
                                        // recordtime20:docs[5].Records.transactionlist[5].transactiondetails.time,
                                         recorddate21:docs[6].Records.transactionlist[0].transactiondetails.date,
                                         recordtime21:docs[6].Records.transactionlist[0].transactiondetails.time,
                                         recorddate22:docs[6].Records.transactionlist[1].transactiondetails.date,
                                         recordtime22:docs[6].Records.transactionlist[1].transactiondetails.time,
                                         recorddate23:docs[6].Records.transactionlist[2].transactiondetails.date,
                                         recordtime23:docs[6].Records.transactionlist[2].transactiondetails.time,
                                         recorddate24:docs[6].Records.transactionlist[3].transactiondetails.date,
                                         recordtime24:docs[6].Records.transactionlist[3].transactiondetails.time,
                                         recorddate25:docs[6].Records.transactionlist[4].transactiondetails.date,
                                         recordtime25:docs[6].Records.transactionlist[4].transactiondetails.time,
                                        // recorddate26:docs[6].Records.transactionlist[5].transactiondetails.date,
                                         //recordtime26:docs[6].Records.transactionlist[5].transactiondetails.time,
                                         recorddate27:docs[6].Records.transactionlist[6].transactiondetails.date,
                                         recordtime27:docs[6].Records.transactionlist[6].transactiondetails.time
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