const mongoose = require('mongoose');
const Schema = require('../models/userModel');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const mongodb = require('mongodb');
const { SECRET_KEY } = require('../config');
const jwt = require('jsonwebtoken');

//required for the session token generation
require('dotenv').config();
const userModel = mongoose.model('User', Schema.userSchema)

function testUser() {
    const user = new userModel({
        email: "van@pham.com",
        name: "vanpham",
        password: "Password97",
        role: "user"
    })
    user.save((err) => {
        if (err) throw err;
    })
}
function testAdmin() {
    const user = new userModel({
        email: "van.pham@gmail.com",
        name: "phuchp1997",
        password: "Password97",
        role: "admin"
    })
    user.save((err) => {
        if (err) throw err
    })
}

module.exports.createTestUser = (req, res) => {
    testUser();
    res.send("added user successfully")
}
module.exports.createAdminUser = (req, res) => {
    testAdmin();
    res.send("created Admin")
}
module.exports.showAllUsers = (req, res) => {
    userModel.collection.find().toArray((err, user) => {
        if (err) {
            res.send("error")
        } else {
            res.send(user)
        }
    });
}
/*
Login controller
*/
module.exports.loginUser = async (req, res) => {
    let data = JSON.parse(req.body.user)
    let email = data.email
    let password = data.password

    let dbUser
    //checks if the email exists
    await User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err)
        }
        dbUser = user

    }).then(async (response) => {
        if (response !== null) {
          
            await comparePasswords(password, await dbUser.password).then((result) => {

                if (result === true) {
                    const accessToken = jwt.sign(dbUser.toJSON(), SECRET_KEY)
                    res.status(200).json({ message: "true", token: accessToken, role: dbUser.role })
                }
                else {
                    res.status(200).json({ message: "false" })
                }
            }).catch((err) => { console.log(err) })
        }

    })
}

async function comparePasswords(currentPassword, dbPassword) {
    let flag = false
    await bcrypt.compare(currentPassword, dbPassword)
        .then((result) => {

            return flag = result
        })
    return flag
}
module.exports.registerAdmin = async (req, res) => {

    let body = JSON.parse(req.body.newAdmin);
    const authHeader = req.headers['authorization']
    const header = authHeader.split(' ')
    const token = header[1];
    const decoded = jwt.decode(token);
    if (decoded.role === 'admin') {
        await User.findOne({ email: body.email }, function (err, user) {
            if (err) {
                console.log(err)
            } else {
                //if there is no user with that email 
                if (user === null) {
                    let addUser = new userModel({
                        email: body.email,
                        name: body.name,
                        password: body.password,
                        role: "admin"
                    })
                    addUser.save(function (err) {
                        if (err) throw err
                    })
                    res.status(200).json({ message: "added" })
                } else if (user != null) {
                    res.status(200).json({ message: "emailTaken" })
                } else {
                    res.status(200).json({ message: "unreachable" })
                }
            }
        })
    } else {
        res.status(200).json({ message: "notAdmin" })
    }
}
module.exports.registerUser = async (req, res) => {
    
    let body = JSON.parse(req.body.newUser);

    //checks if users email exists already
    await User.findOne({ email: body.email }, function (err, user) {
        if (err) {
            console.log(err)
        } else {
          
            //if there is no user with that email 
            if (user === null) {
                let addUser = new userModel({
                    email: body.email,
                    name: body.name,
                    password: body.password,
                    role: "user"
                })
                addUser.save(function (err) {
                    if (err) throw err
                })
                res.status(200).json({ message: "added" })
            } else if (user != null) {
                res.status(200).json({ message: "emailTaken" })
            } else {
                res.status(200).json({ message: "unreachable" })
            }
        }
    })
}

module.exports.deleteUserByID = (req, res) => {
    var userId = JSON.parse(req.body.userID);
    
    const authHeader = req.headers['authorization']
    const header = authHeader.split(' ')
    const token = header[1];
    const decoded = jwt.decode(token);
    
    if (decoded.role == 'admin') {
        userModel.deleteOne({ _id: new mongodb.ObjectID(userId) }, (err, user) => {
            if (err) res.send(err)
        })
        res.status(200).json({ message: "true" })
    }
    else{
        res.status(401).json({message: "You must be the admin to delete"})
    }
}
module.exports.deleteAllUsers = (req, res) => {
    const authHeader = req.headers['authorization']
    const header = authHeader.split(' ')
    const token = header[1];
    const decoded = jwt.decode(token);
    if(decoded.role == "admin"){
        userModel.delete({}, (err) => {
            if (err) {
                res.send(err)
            }
            res.status(200).json({ message: "true" })
            res.end()
        })
    }
    else {
        res.status(401).json({message: "You must be the admin to delete"})
    }
    
}



