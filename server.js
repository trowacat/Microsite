var express = request("express");
var app = express();

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/about", function(req, res){
    res.send("Hello World<br /><a href='/about'>Go to the about page</a>");
});

// setup another route to listen on /about
app.get("/about", function(req,res){
   res.send("<h3>About</h3>");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);