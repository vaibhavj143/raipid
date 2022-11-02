




import mongoose from "mongoose";

import bcrypt from 'bcrypt';

import dotenv from 'dotenv'

import jwt from 'jsonwebtoken'

dotenv.config();

const userModel =  mongoose.Schema({


fName:{
    type:String,
    maxLength:18,
    trim :true,
    required: true

},
lName:{
    type:String,
    maxLength:18,
    trim :true,
},
email:{
    type:String,
    lowercase:true,
    trim :true,
    required: true,
    unique: true
},

password:{
    type:String,
    trim :true,
    required: true,
    minLength: [6 , "Too short"],
    maxLength: [16 , "Too long"],
    select:false
},

createdAt:{
    type :Date,
    default : Date.now()

},

isAuth:{

    type:Boolean,
    default:false,
    required: true
}


},
{ timestamps: true }
);


userModel.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });


userModel.methods.matchPassword = async function (password) {
    // console.log(password,this.password,this.email);
    return await bcrypt.compare(password, this.password);
  };
  userModel.methods.generateToken = async function () {
    // console.log(password,this.password,this.email);
  
    return jwt.sign(
      { _id: this._id },
      process.env.JWT_SECRET 
    );
  };

const User = mongoose.model("User", userModel);


export default User