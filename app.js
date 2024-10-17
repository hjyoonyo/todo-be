// 1. 기본 세팅
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();
app.use(bodyParser.json());
app.use("/api",indexRouter);


const mongoURI = 'mongodb://localhost:27017/todo-demo';

mongoose.connect(mongoURI,{useNewUrlParser:true}) //요즘 형태의 주소도 잘 쓰도록
.then(()=>{ 
    console.log("mongoose connected");
})
.catch((err)=>{
    console.log("DB connection fail", err);
}); 

app.listen(5000, ()=>{ //프론트엔드는 주로 3000번. 백엔드는 주로 5000번을 씀. 임의로 설정 가능.
    console.log("server on 5000");
});

