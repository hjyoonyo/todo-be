const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken"); // 토큰 발행 라이브러리
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
//User Schema
const userSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true});

//token
userSchema.methods.generateToken=function(){
    const token = jwt.sign(
        {_id:this._id}, 
        JWT_SECRET_KEY,
        {expiresIn:'1d'}
    );
    return token;
}

//유저 정보 가져올 때 패스워드 정보 삭제
userSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.password;
    return obj;
}

//Make Model
const User = mongoose.model("User",userSchema);
module.exports = User;