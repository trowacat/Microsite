/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Brandon Wissmann Student ID: 122538168 Date: 6/21/2017
*
* Online (Heroku) Link: https://stark-fortress-99847.herokuapp.com
*
********************************************************************************/

const express = require("express");
const dataService = require("./data-service.js");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: "layout",
    helpers: {
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue)
                return options.inverse(this);
            else
                return options.fn(this);
        }
    }

}))

app.set("view engine", ".hbs");

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
    res.send(dataService.getAllEmployees());
})

// setup another route to listen on /about
app.get("/about", function (req, res) {
    res.render("about");
})

app.get("/scramble", function (req, res) {
    res.sendFile(path.join(__dirname + "/node_modules/scramblejs/dist/scramble.js"));
})

app.get("/employees", function (req, res) {
    if (req.query.status) {
        dataService.getAllEmployeesByStatus(req.query.status).then((data) => {
            res.render("employeeList", { data: dataMessage, title: "Employees" });
        }).catch((errorMessage) => {
            res.render("employeeList", { data: {}, title: "Employees" });
        });
    } else if (req.query.manager) {
        dataService.getAllEmployeesByManager(req.query.manager).then((data) => {
            res.render("employeeList", { data: data, title: "Employees(Managers)" });
        }).catch((errorMessage) => {
            res.render("employeeList", { data: {}, title: "Employees (Managers)" });
        });
    } else if (req.query.department) {
        dataService.getAllEmployeesByDepartment(req.query.department).then((data) => {
            res.render("departmentList", { data: data, title: "Departments" });
        }).catch((errorMessage) => {
            res.render("departmentList", { data: {}, title: "Departments" });
        });
    } else {
        dataService.getAllEmployees().then((data) => {
            res.render("employeeList", { data: data, title: "Employees" });
        }).catch((errorMessage) => {
            res.render("employeeList", { data: {}, title: "Employees" });
        });

    }
})

app.get("/employees/add", (req, res) => {
    res.render("addEmployee");
});

app.post("/employees/add", (req, res) => {
    dataService.addEmployee(req.body)
        .then(res.redirect("/employees"));
})


app.get("/employees/:employeeNum", function (req, res) {
    dataService.getEmployeeByNum(req.params.employeeNum).then((data) => {
        res.render("employee", { data: data });
    }).catch((errorMessage) => {
        res.status(404).send("Employee Not Found")
    });
})

app.get("/departments/add", (req, res) => {
    res.render("addDepartment");
})

app.post("/departments/add", (req, res) => {
    dataService.addDepartment(req.body)
        .then(res.redirect("/departments"));
})

app.get("/departments", function (req, res) {
    dataService.getDepartments().then((data) => {
        res.render("departmentList", { data: data, title: "Departments" });
    }).catch((errorMessage) => {
        res.render("departmentList", { data: {}, title: "Departments" });
    });
})


app.post("/departments/update", (req, res) => {
    dataService.updateDepartment(req.body)
        .then(() => {
            res.redirect("/departments")
        })

})

app.get("/employees/:employeeNum", function (req, res) {
    dataService.getDepartmentById(req.params.employeeNum).then((data) => {
        res.render("department", { data: data });
    }).catch((errorMessage) => {
        res.status(404).send("Department Not Found")
    });
})


app.get("/managers", function (req, res) {
    dataService.getManagers().then((data) => {
        res.render("employeeList", { data: data, title: "Employees(Managers)" });
    }).catch(() => {
        res.render("employeeList", { data: {}, title: "Employees (Managers)" });
    });
})

app.post("/employee/update", (req, res) => {
    dataService.updateEmployee(req.body)
        .then(() => {
            res.redirect("/employees")
        })

})

app.use(function (req, res) {
    res.status(404).send("Page not found.");
})
// setup http server to listen on HTTP_PORT
dataService.initialize().then(() =>
    app.listen(HTTP_PORT, onHttpStart)).catch(() => console.log("Unable to start the server."));