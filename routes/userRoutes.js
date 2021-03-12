const {
    showAllUsers,
    createTestUser,
    loginUser,
    createAdminUser,
    registerUser,
    registerAdmin,
    deleteUserByID
} = require('../controllers/userController');
const authenticateToken = require('./middleware.js');

module.exports = (app) =>{
    //Creates a User
    //Checked
    app.route('/api/user')
    .get((req,res,next) => {
        next();
    },createTestUser)

    //create Admin user
    //checked
    app.route('/api/createAdmin')
    .get((req,res,next) =>{
        next();
    }, createAdminUser)

    //Registers router
    //checked
    app.route('/api/register')
    .post((req,res,next) =>{
        next();    
    },registerUser)

    //Login user 
    //Checked
    app.route('/api/login')
    .post((req,res,next) =>{
        next();
    },loginUser)
    
    //Displays all users-
    //checked
    app.route('/api/allusers')
    .get((req,res,next) =>{
        next();
    },showAllUsers)
    //checked
    //should have admin role
    app.route('/api/deleteuser')
    .delete(authenticateToken,(req,res,next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    },deleteUserByID)
    //should have admin role
    app.route('/api/registerAdmin')
    .post(authenticateToken, (req,res,next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    },registerAdmin)
}

//res.setHeader('Access-Control-Allow-Origin', '*');