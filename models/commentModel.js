const { Schema, model} = require("mongoose");
const  mongoose = require("mongoose");
const commentSchema = new Schema({
    email:String,
    companyName:String,
    content: String,
    date: Date,
    rating: Number,
  
});
exports.commentSchema;
module.exports.Comment = mongoose.model('Comment', commentSchema);

