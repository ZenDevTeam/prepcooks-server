const mongoose  = require('mongoose');
const Schema = require('../models/commentModel');
const mongodb  = require('mongodb');
const User  = require('../models/userModel');

const commentModel = mongoose.model('Comment', Schema.commentSchema)

function comment() {
    var comment = new commentModel({
        email: "test@test.com",
        companyName: "Clean Bite",
        content: "greate food perfect meals",
        date: "1/11/2020",
        rating: 5
    });
    comment.save((err) => {
        if (err) throw err
    })

}
module.exports.addTestComment = (req, res) => {
    comment();
    res.send("comment Added")
}

module.exports.addComment = async (req, res) => {
    const commentData = JSON.parse(req.body.newComment)
    if (commentData.companyName !== null) {
        const commentValidator = await validateComment(req.user.email, commentData.companyName).catch(() => "promis rejected")
        if (await commentValidator === null ) {
            let data = new commentModel({
                email: req.user.email,
                companyName: commentData.companyName,
                content: commentData.content,
                date: Date.now(),
                rating: commentData.rating
            })
            data.save((err) => {
                if (err) throw err
            })
            res.status(200).json({ message: "added", email: req.user.email, date: Date.now(), content: commentData.message })
            res.end();
        }
        else {
            res.status(200).json({ message: "AlreadyCommented" })
        }
    }else{
        res.status(200).json({ message: "AlreadyCommented" })
    }
}
module.exports.deleteAllComments = (req, res) => {
    commentModel.deleteMany({}, (err) => {
        if (err) {
            res.send(err)
        }
        res.send("deleted all comments")
        res.end();
    });
}

module.exports.allCommentsByCompany = (req, res) => {
    console.log(req.body);
    const name = JSON.parse(req.body.companyName)

    commentModel.collection.find({ companyName: name }).toArray((err, comments) => {
        if (err) res.send(err)
        else {
            res.send(comments)
        }
    });
}

module.exports.allCommentsAdmin = (req, res) => {
    commentModel.collection.find({}).toArray(function (err, comments) {
        if (err) {
            res.send(err)
        } else {
            res.send(comments)
        }
    });
}
module.exports.deleteCommentById = (req, res) => {

    commentModel.deleteOne({ _id: new mongodb.ObjectID(commentId) }, (err, company) => {
        if (err) res.send(err)
    })
    res.status(200).json({ message: "true" })
}

async function validateComment(checkerEmail, checkerCompanyName) {
    let response

    await commentModel.findOne({ email: checkerEmail, companyName: checkerCompanyName }, function (err, comment) {
        if (err) return err

        response = comment

    }).catch((err) => console.log(err)).then();
    return response;
}
