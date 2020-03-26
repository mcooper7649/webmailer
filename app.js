const https = require("https");
const express = require("express");   //Default express configuration needed
const bodyParser = require("body-parser")
const app = express();


app.use(bodyParser.urlencoded({extend: true}));
app.use(express.static("public"));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ],

    }


    const jsonData = JSON.stringify(data);
    const url = 'https://us19.api.mailchimp.com/3.0/lists/1dbb72578e'
    const options = {
        method: "POST",
        auth: "mike1:6c92e8cf40fce60cdcaaede5d606ab22-us19"
    }
    const request = https.request(url, options, function(response){

       if (response.statusCode === 200){
           res.sendFile(__dirname + "/success.html");
       } else {
           res.sendFile(__dirname + "/failure.html");
       }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){   //ADDS HEROKU PORT OR LOCAL
    console.log("server is running on port 3000.");
})








// List id 1dbb72578e 
