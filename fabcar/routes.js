//---------------------Mock Services For UI testing--------------------------
    
    // Login service for UI testing with predefined users.
    router.post("/mock/Login", (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        console.log(JSON.stringify(req.body))
        console.log(email);
        if (email === "harini@gmail.com") {
            res.send({
                "message": "Login Successful",
                "status": true,
                "userType": "borrower"
            })
        } else if (email == "hari@gmail.com") {
            res.send({
                "message": "Login Successful",
                "status": true,
                "userType": "Bank"
            })
        } 
    })
