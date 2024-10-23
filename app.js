// 1. 기본 세팅
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
const REACT_APP_FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

// 프론트엔드 URL 환경 변수를 설정
const allowedOrigins = [
    "http://localhost:3000",   // 로컬 개발 환경
    REACT_APP_FRONTEND_URL  // 프로덕션 환경
  ];

app.use(bodyParser.json());
app.use(cors({
    // 허용할 프론트엔드 출처
    origin: function (origin, callback) {
        // 요청의 origin이 허용된 출처 리스트에 포함되어 있는지 확인
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);  // 허용된 출처라면 요청 허용
        } else {
          callback(new Error('Not allowed by CORS'));  // 그렇지 않으면 에러 반환
        }
      }
}));
app.use("/api",indexRouter);


const mongoURI = MONGODB_URI_PROD;

mongoose.connect(mongoURI,{useNewUrlParser:true}) //요즘 형태의 주소도 잘 쓰도록
.then(()=>{ 
    console.log("mongoose connected");
})
.catch((err)=>{
    console.log("DB connection fail", err);
}); 

app.listen(process.env.PORT || 5000, ()=>{ //프론트엔드는 주로 3000번. 백엔드는 주로 5000번을 씀. 임의로 설정 가능.
    console.log("server on 5000");
});