const {
    singleCompany,
    createCompany,
    allCompany,
    deleteCompany,
    deleteAllComapny,
    updateCompany,
    addCompany
} = require('../controllers/companyController');

module.exports = (app) => {
    //checked 
    app.route('/api/company')
        .get((req, res, next) => {
            next();
        }, createCompany),
    //checked
    app.route('/api/allCompanies')
        .get((req, res, next) => {
            next();
        }, allCompany)
    //
    app.route('/api/deleteAllComapny')
        .delete((req, res, next) => {
            next();
        }, deleteAllComapny)

    app.route('/api/addcompany')
        .post((req, res, next) => {
            next();
        }, addCompany)
    //checked
    app.route('/api/deleteCompany')
        .delete((req, res, next) => {
            next();
        }, deleteCompany)

    app.route('/api/update-company')
        .put((req, res, next) => {
            next();
        }, updateCompany)

    app.route('/api/singleCompany')
        .post((req, res, next) => {
            next();
        }, singleCompany)
}
