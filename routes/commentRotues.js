const { addTestComment, deleteAllComments, allCommentsByCompany, addComment, allCommentsAdmin, deleteCommentById } = require('../controllers/commentController');

const authenticateToken = require('./middleWare.js');

module.exports = (app) => {
    //creates a test comments
    app.route('/api/addTestComment')
        .get((req, res, next) => {
            next();
        }, addTestComment),
    //deletes all components
    app.route('/api/deleteComments')
        .get((req, res, next) => {
            next()
        }, deleteAllComments),
    //get comments by company
    app.route('/api/allComments')
        .post((req, res, next) => {
            next();
        }, allCommentsByCompany),
        //add comment
    app.route('/api/addComment')
        .post(authenticateToken, (req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        }, addComment),
    app.route('/api/allCommentsAdmin')
        .get((req, res, next) => {
            next();
        }, allCommentsAdmin)
    app.route('/api/deleteComment')
        .post((req, res, next) => {
            next()
        }, deleteCommentById)


}
