/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Brandon Wissmann Student ID: 122538168 Date: 5/24/17
*
* Online (Heroku) Link: https://stark-fortress-99847.herokuapp.com
*
********************************************************************************/

const express = require("express");
const dataService = require("./data-service.js");
const path = require("path");
const app = express();

app.use(express.static('public'));

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/scramble", function (req, res) {
    res.sendFile(path.join(__dirname + "/node_modules/scramblejs/dist/scramble.js"));
});

app.get("/employees", function (req, res) {
    if (req.query.status) {
        dataService.getAllEmployeesByStatus(req.query.status).then((dataMessage) => {
            res.json({ dataMessage });
        }).catch((errorMessage) => {
            res.json({ message: errorMessage });
        });
    } else if (req.query.manager) {
        dataService.getAllEmployeesByManager(req.query.manager).then((dataMessage) => {
            res.json({ dataMessage });
        }).catch((errorMessage) => {
            res.json({ message: errorMessage });
        });
    } else if (req.query.department) {
        dataService.getAllEmployeesByDepartment(req.query.department).then((dataMessage) => {
            res.json({ dataMessage });
        }).catch((errorMessage) => {
            res.json({ message: errorMessage });
        });
    } else {
        dataService.getAllEmployees().then((dataMessage) => {
            res.json({ dataMessage });
        }).catch((errorMessage) => {
            res.json({ message: errorMessage });
        });

    }
});

app.get("/employees/:empNum", function (req, res) {
    dataService.getEmployeeByNum(req.params.empNum).then((dataMessage) => {
        res.json({ dataMessage });
    }).catch((errorMessage) => {
        res.json({ message: errorMessage });
    });
});

app.get("/departments", function (req, res) {
    dataService.getDepartments().then((dataMessage) => {
        res.json({ dataMessage });
    }).catch((errorMessage) => {
        res.json({ message: errorMessage });
    });
});

app.get("/managers", function (req, res) {
    dataService.getManagers().then((dataMessage) => {
        res.json({ dataMessage });
    }).catch((errorMessage) => {
        res.json({ message: errorMessage });
    });
})

app.use(function (req, res) {
    res.status(404).send("Page not found.");
})
// setup http server to listen on HTTP_PORT
dataService.initialize().then(() =>
    app.listen(HTTP_PORT, onHttpStart)).catch(() => console.log("Unable to start the server."));