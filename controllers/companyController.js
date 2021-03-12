const mongoose = require('mongoose');
const Schema = require('../models/companyModel');
const mongodb = require('mongodb');
const companyModel = mongoose.model('Company', Schema.companySchema)

function testCompany(){
    let company = new companyModel({
        name: 'Test',
        deliveryLocations: [`GTA`,`Brampton`],
        deliveryDays: ['Monday',`Wednesday`],
        cutOff: {
            time: 10,
            zone: "PM"
        },
        paymentOptions: ['cash', 'Credit card'],
        priceRange: {
            lowest: '9.99',
            highest: '15.99'
        },
        logoURL: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/"
         + "golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
        bulkDiscount: 'true',
        numberOfMeals: '10',
        mealOptions: {
            breakFast: '1',
            lunch: 'none',
            dinner: '8',
            snacks: '1'
        },
        menuChanges: 'true',
        sizeOptions: 'false',
        vegetarian: 'true',
        extraProtein: 'true',
        vegan: 'false',
        instagramFollowers: '100000'
    });
    company.save((err) =>{
        if(err) throw err
    })
    
}
module.exports.createCompany = (req, res) =>{
    testCompany();
    res.send("company created")
}
module.exports.addCompany = (req,res) =>{
    const company = JSON.parse(req.body.company);
 
    var companyData = new companyModel({
        name: company.name,
        deliveryLocations: company.deliveryLocations,
        description: company.description,
        deliveryDays: company.deliveryDays,
        cutOff: {
            time: company.cutOff.time,
            zone: company.cutOff.zone
        },
        paymentOptions: company.paymentOptions,
        priceRange: {
            lowest: company.priceRange.lowest,
            highest: company.priceRange.highest
        },
        logoURL: company.logoURL,
        bulkDiscount: company.bulkDiscount,
        numberOfMeals: company.numberOfMeals,
        mealOptions: [{
            breakFast: company.mealOptions.breakFast,
            lunch: company.mealOptions.lunch,
            dinner: company.mealOptions.dinner,
            snacks: company.mealOptions.snacks
        }],
        menuChanges: company.menuChanges,
        sizeOptions: company.menuChanges,
        vegetarian: company.vegetarian,
        extraProtein: company.extraProtein,
        vegan: company.vegan,
        averageRating: 0,
        instagramFollowers: company.instagramFollowers
    });
    companyData.save((err) =>{
        if(err) throw err
    });
    res.status(200).json({ message: "true" })
    res.end();
}


module.exports.allCompany = (req, res) =>{
    companyModel.collection.find({}).toArray( function(err,company){
        if(err){
            res.send("error")
        }else{
            res.send(company)
        }
    });
}

module.exports.deleteAllComapny = (req, res) =>{
    companyModel.deleteMany({}, (err) =>{
        if(err){
            res.send(err)
        }
        res.send("deleted all companys")
        res.send();
    });
}

module.exports.deleteCompany = (req,  res )=>{
    const companyID = req.body.companyID;
    companyModel.deleteOne({_id: new mongodb.ObjectID(companyID)}, (err) =>{
        if(err){
            res.send(err)
        }
        res.status(200).json({ message: "true" })
        
    });
}

module.exports.singleCompany = (req,  res )=>{
    
    const companyID = req.body.companyID
    companyModel.findOne({_id: new mongodb.ObjectID(companyID)}, (err, company) => {
        if(err) res.send("error");
        else {
            res.send(company);
        }
    });
}

module.exports.updateCompany = (req, res) => {
    const company = JSON.parse(req.body.company);
    const companyID = company._id;

    companyModel.updateOne({_id: new mongodb.ObjectID(companyID)}, company, (err) =>{
        if(err){
            res.send(err)
        }
        res.status(200).json({ message: "true" }); 
    });
}