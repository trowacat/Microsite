const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Comment;

var commentSchema = new Schema({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "commentText": String,
    "postedDate": Date,
    "replies": [{ 
        "comment_id": String,
        "authorName": String,
        "authorEmail": String,
        "commentText": String,
        "repliedDate": Date
     }]
})

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://bwissmann:Zaqmmkkl2!@ds039411.mlab.com:39411/web322_a6");
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("comments", commentSchema);
            resolve();
        });
    });
}

module.exports.addComment = function (data) {
    return new Promise(function (resolve, reject) {
        let newComment = new Comment(data);
        newComment.postedDate = Date.now();
        newComment.save((err) => {
            if (err) {
                reject("there was an error saving the comment:" + err);
            }
            else {
                resolve(newComment._id);
            }
        });
    })
}

module.exports.addReply = function (data) {
    return new Promise(function (resolve, reject) {
        console.log("data::::: " + data.authorName);
        data.repliedDate = Date.now();
        Comment.update({_id: data.comment_id},  { $addToSet: { replies: data } } , { multi: false})
        .exec()
        .then((Reply) => {
            if (Reply)
                resolve();
        })
        .catch((err) => {
            reject(err);
        })
    })
}

module.exports.getAllComments = function () {
    return new Promise(function (resolve, reject) {
        Comment.find()
            .sort({ postedDate: 1 })
            .exec()
            .then((Comment) => {
                if (!Comment) {
                    reject("there was an error finding any comment");
                }
                else {
                    resolve(Comment);
                }
            })
            .catch((err) => {
                reject("error loading the comments:" + err);
            }
            )
    })
}

