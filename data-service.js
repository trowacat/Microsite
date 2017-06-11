var fs = require('fs')

var exports = module.exports = {};
var employees = [];
var departments = [];

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        function emps() {
            return new Promise((resolve, reject) => {
                employees = JSON.parse(fs.readFileSync('./data/employees.json', 'utf8'));
                if (employees.length === 0)
                    reject("Unable to read file");
                else {
                    resolve();
                }
            })
        };

        emps().then(() => {
            departments = JSON.parse(fs.readFileSync('./data/department.json', 'utf8'));
            console.log("Files initialized");
            if (departments == "")
                reject("Unable to read file");
        });
        resolve();
    });
};

module.exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        if (employees.length === 0)
            reject("No results in employee");
        else {
            resolve(employees);
        }

    });
}

module.exports.getAllEmployeesByStatus = (status) => {
    return new Promise((resolve, reject) => {
        if (employees.length === 0)
            reject("No results in employee");
        else {
            var statusEmployees = [];
        for (i = 0; i < employees.length; i++) {
            if (employees[i].status == status)
                statusEmployees.push(employees[i]);
        }
        }
        resolve(statusEmployees);

    });
}

module.exports.getAllEmployeesByDepartment = (department) => {
    return new Promise((resolve, reject) => {
        if (employees.length === 0)
            reject("No results in employee");
        else {
            var departEmployees = [];
        for (i = 0; i < employees.length; i++) {
            if (employees[i].department == department)
                departEmployees.push(employees[i]);
        }
        }
        resolve(departEmployees);

    });
}

module.exports.getAllEmployeesByManager = (manager) => {
    return new Promise((resolve, reject) => {
        if (employees.length === 0)
            reject("No results in employee");
        else {
            var manageEmployees = [];
            for (i = 0; i < employees.length; i++) {
                if (employees[i].employeeManagerNum == manager)
                    manageEmployees.push(employees[i]);
            }
        }
        resolve(manageEmployees);

    });
}

module.exports.getEmployeeByNum = (num) => {
    return new Promise((resolve, reject) => {
        if (employees.length === 0)
            reject("No results in employee");
        else {
            var employee;
            for (i = 0; i < employees.length; i++) {
                if (employees[i].employeeNum == num)
                    employee = employees[i];
            }
        }
        resolve(employee);

    });
}

module.exports.getManagers = () => {
    return new Promise((resolve, reject) => {
        if (employees.length === 0)
            reject("No results in employee");
        else {
            var managers = [];
            for (i = 0; i < employees.length; i++) {
                if (employees[i].isManager === true) {
                    managers.push(employees[i]);
                }
            }
            resolve(managers);
        }

    });
}

module.exports.getDepartments = () => {
    return new Promise((resolve, reject) => {
        if (employees.length === 0)
            reject("No results in departments");
        else
            resolve(departments);

    });
}