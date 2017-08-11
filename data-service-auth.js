const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;
let User;

var userSchema = new Schema({
    "user": {
        type: String,
        unique: true
    },
    "password": String,
})

userSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
 
    
    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
 
            user.password = hash;
            next();
        });
    });
});


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
        // Password hashing is done in a pre schema defined function under the schema definition at the top of this file
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
        console.log("checking user.....................")
        User.find({ user: userData.user })
            .exec()
            .then((users) => {
                if (!users.length)
                    reject("Unable to find user:" + userData.user);
                else {
                    console.log("checking password................" + userData.password)
                    bcrypt.compare(userData.password, users[0].password).then((res) => {
                        console.log("Finished comparing")
                        if (res) {
                            console.log("passsword matches..........");
                            resolve();
                        }
                        else
                            console.log("password doesn't match.........")
                            reject("Unable to find user" + userData.user);
                    });
                }

            })
    })
}

module.exports.updatePassword = function (userData) {
    return new Promise(function (resolve, reject) {
        console.log("Updating password...")
        User.update({ user: userData.user },
            { $set: { password: bcrypt.hashSync(userData.password) } },
            { multi: false })
            .exec()
            .then(resolve())
            .catch(reject("There was an error updating the password for: " + userData.user));

    })
}

