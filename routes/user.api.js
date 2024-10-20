const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

//1.회원가입 endpoint
router.post("/",userController.createUser);
//2.로그인
router.post("/login",userController.loginWithEmail); //이메일과 패스워드 정보를 읽어오기 위해 post 사용 = request.body를 사용하기 위함

module.exports = router;
