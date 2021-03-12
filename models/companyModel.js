"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.companySchema = undefined;

var _mongoose = require("mongoose");

var companySchema = exports.companySchema = new _mongoose.Schema({
    name: String,
    deliveryLocations: [],
    deliveryDays: [],
    description: String,
    cutOff:{
        time: String,
        zone:String,
    },
    paymentOptions: [],
    priceRange: {
        lowest: String,
        highest: String
    },
    logoURL: String,
    bulkDiscount: String,
    numberOfMeals:String,
    mealOptions: [{
        breakFast: String,
        lunch: String,
        dinner: String,
        snacks: String
    }],
    menuChanges: String,
    sizeOptions: String,
    vegetarian: String,
    extraProtein: String,
    vegan: String,
    averageRating:Number,
    instagramFollowers: String
});

var Company = (0, _mongoose.model)('Company', companySchema);

exports.default = Company;
module.exports = Company = _mongoose.model('Company', companySchema)