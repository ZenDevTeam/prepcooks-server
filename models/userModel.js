const bcrypt = require('bcrypt')
const {Schema, model} = require("mongoose");
const  mongoose = require("mongoose");
const userSchema = new Schema({
    email: String,
    name: String,
    password: String,
    role: String
});

//before saving the new user into the api database
//it hash the password;
userSchema.pre("save", function (next){
    let user = this;
  
      // only hash the password if it has been modified (or is new)
     
      if (!user.isModified('password')) return next();
  
      // generate a salt
      bcrypt.hash(user.password,10, (err, hash)=> {
          if(err){
              console.log(err)
              next()
          }else{
            user.password = hash
            next();
          }
    })
    // try {
    //     if (!this.isModified('password')) return next();
    
      
    //     const hash = await bcrypt.hash(this.password, 10);
    //     this.password = hash;
      
    //     return next();
    //    } catch (error) {
    //     return next(error);
    //    }
});
exports.userSchema;
module.exports = User = mongoose.model('User', userSchema)