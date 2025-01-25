const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const userSchema = Schema({
    firstName: String,
    lastName:String,
    username:{type:String,required:true},
    password:{type:String , required:true}
})

userSchema.pre("save" , async function(next){
   const user = this; // refers to the current document 
   if(!user.isModified('password')) return next(); // if it's not modifed never been touched before 
   let salt = await bcrypt.genSalt(10);
   let hash = await bcrypt.hash(user.password,salt);
   user.password = hash;
   next(); 

})

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);  // Compare the plain password with the hashed password
  };// custom method for the schema

const User = mongoose.model("User",userSchema) // Create a collection in DB called users 
module.exports = User; 