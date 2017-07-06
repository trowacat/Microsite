const Sequelize = require('sequelize');
var fs = require('fs')

var exports = module.exports = {};
var employees = [];
var departments = [];
var empCount = 0;

var sequelize = new Sequelize('d6j92onnu8mlpv', 'hcdlohawzpgujk', '80c67f7d4f95899597d797dde4720166dad491f79dd543f4d83c6c3cfe96070d', {
    host: 'ec2-23-21-220-188.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
})

var employeeTable = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addresCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNumber: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});

var departmentTable = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(
            resolve()).catch(function (err) { console.log('unable to sync database') });
    });
};

module.exports.addEmployee = (employeeData) => {
    return new Promise((resolve, reject) => {
        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if (employeeData[prop] === '' | employeeData[prop] === undefined)
                employeeData[prop] = null;
        }

        employeeTable.create({
            employeeNum: employeeData.employeeNum,
            firstName: employeeData.firstName,
            last_name: employeeData.last_name,
            email: employeeData.email,
            SSN: employeeData.SSN,
            addressStreet: employeeData.addressStreet,
            addresCity: employeeData.addresCity,
            addressState: employeeData.addressState,
            addressPostal: employeeData.addressPostal,
            maritalStatus: employeeData.maritalStatus,
            isManager: employeeData.isManager,
            employeeManagerNumber: employeeData.employeeNum,
            status: employeeData.status,
            department: employeeData.department,
            hireDate: employeeData.hireDate
        })
            .then(resolve());
    })
        .catch('unable to add employee');
}

module.exports.updateEmployee = (employeeData) => {
    return new Promise((resolve, reject) => {
        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if (employeeData[prop] === '' | employeeData[prop] === undefined)
                employeeData[prop] = null;
        }

        employeeTable.update({
            employeeNum: employeeData.employeeNum,
            firstName: employeeData.firstName,
            last_name: employeeData.last_name,
            email: employeeData.email,
            SSN: employeeData.SSN,
            addressStreet: employeeData.addressStreet,
            addresCity: employeeData.addresCity,
            addressState: employeeData.addressState,
            addressPostal: employeeData.addressPostal,
            maritalStatus: employeeData.maritalStatus,
            isManager: employeeData.isManager,
            employeeManagerNumber: employeeData.employeeNum,
            status: employeeData.status,
            department: employeeData.department,
            hireDate: employeeData.hireDate
        }, {
                where: {
                    employeeNum: employeeData.employeeNum
                }
            })
            .then(resolve())
            .catch('unable to add employee');;
    })
}


module.exports.getAllEmployees = () => {
    return new Promise(function (resolve, reject) {
        employeeTable.findAll()
            .then((data) => {
                resolve(data)
            })
            .catch((err) => function (err) {
                console.log('no results returned');
                reject();
            })
    });
}

module.exports.getAllEmployeesByStatus = (Status) => {
    return new Promise(function (resolve, reject) {
        employeeTable.findAll({
            where: {
                status: Status
            }
        })
            .then((data) => {
                resolve(data)
            })
            .catch((err) => function (err) {
                console.log('no results returned');
                reject();
            })
    });
}

module.exports.getAllEmployeesByDepartment = (Department) => {
    return new Promise(function (resolve, reject) {
        employeeTable.findAll({
            where: {
                department: Department
            }
        })
            .then((data) => {
                resolve(data)
            })
            .catch((err) => function (err) {
                console.log('no results returned');
                reject();
            })
    });
}

module.exports.getAllEmployeesByManager = (manager) => {
    return new Promise(function (resolve, reject) {
        employeeTable.findAll({
            where: {
                employeeManagerNumber: manager
            }
        })
            .then((data) => {
                resolve(data)
            })
            .catch((err) => function (err) {
                console.log('no results returned');
                reject();
            })
    });
}

module.exports.getEmployeeByNum = (num) => {
    return new Promise(function (resolve, reject) {
        console.log('looking for employee num:::: ' + num);
        employeeTable.findAll({
            where: {
                employeeNum: num
            }
        })
            .then(data => {
                resolve(data[0])
            })
            .catch((err) => function (err) {
                console.log('no results returned');
                reject();
            })
    });
}

module.exports.getManagers = () => {
    return new Promise(function (resolve, reject) {
        employeeTable.findAll({
            where: {
                isManager: true
            }
        })
            .then((data) => {
                resolve(data)
            })
            .catch((err) => function (err) {
                console.log('no results returned');
                reject();
            })
    });
}


// Department functions

module.exports.addDepartment = (departmentData) => {
    return new Promise((resolve, reject) => {

        for (var prop in departmentData) {
            if (departmentData[prop] === '' | departmentData[prop] === undefined)
                departmentData[prop] = null;
        }

        departmentTable.create({
            departmentName: departmentData.departmentName
        })
            .then(resolve());
    })
        .catch('unable to add department');
}


module.exports.updateDepartment = (departmentData) => {
    return new Promise((resolve, reject) => {

        for (var prop in departmentData) {
            if (employeeData[prop] === '' | employeeData[prop] === undefined)
                employeeData[prop] = null;
        }

        departmentTable.update({
            departmentId: departmentData.departmentId,
            departmentName: departmentData.departmentName
        })
            .then(resolve());
    })
        .catch('unable to update department');
}

module.exports.getDepartmentById = (id) => {
    return new Promise(function (resolve, reject) {
        departmentTable.findAll({
            where: {
                departmentId: id
            }
        })
            .then(data => {
                resolve(data[0])
            })
            .catch((err) => function (err) {
                console.log('no results returned');
                reject();
            })
    });
}

module.exports.getDepartments = () => {
    return new Promise(function (resolve, reject) {
        departmentTable.findAll()
            .then((data) => {
                resolve(data)
            })
            .catch((err) => function (err) {
                console.log('no results returned');
                reject();
            })
    });
}