const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User;

var userSchema = new Schema({
    "user": {
        type: String,
        unique: true
    },
    "password": String,
})

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://bwissmann:Zaqmmkkl2!@ds161159.mlab.com:61159/web322_a7");
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            User = db.model("users", userSchema);
            resolve();
        });
    });
}

module.exports.registerUser = function (userData) {
    return new Promise(function (resolve, reject) {
        if (userData.password != userData.password2) {
            reject("Passwords do not match");
        } else {
            let newUser = new User(userData);
            newUser.save((err) => {
                if (err) {
                    if (err.code == 11000) {
                        reject("User Name already taken");
                    } else {
                        reject("There was an error creating the user: " + err);
                    }
                }
                else {
                    resolve();
                }
            });
        }
    })
}


module.exports.checkUser = function (userData) {
    return new Promise(function (resolve, reject) {
        User.find({ user: userData.user })
            .exec()
            .then((users) => {
                if (!users.length)
                    reject("Unable to find user:" + userData.user);
                else if (users[0].password != userData.password)
                    reject("Incorrect Password for user:" + userData.user);
                else if (users[0].password == userData.password)
                    resolve();
                else
                    reject("Unable to find user" + userData.user);
            })
    })
}

