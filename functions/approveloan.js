'use strict';

exports.approveloan = (requestid) =>
new Promise((resolve, reject) => {


    const approve_details = ({
        requestid: requestid

    });

    console.log("ENTERING THE approveloan");
    
    approveloan({
        
        approvedetails: approve_details
    })

        .then(() => resolve({
            status: 201,
            message: 'Loan approved Sucessfully !'
        }))

        .catch(err => {

            if (err.code == 11000) {

                reject({
                    status: 409,
                    message: ' Loan closed !'
                });

            } else {
                console.log("error occurred" + err);

                reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            }
        });
});