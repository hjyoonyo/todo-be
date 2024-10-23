//권한 관리
const authController = {};
const jwt = require("jsonwebtoken");

//nodeJS에서 env 파일을 읽어오는 방식
require("dotenv").config(); 
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req,res,next)=>{
    try {
        const tokenString = req.headers.authorization;
        console.log("tokenString",tokenString);
        //Bearer asfsdvsadf
        if (!tokenString){
            throw new Error("invalid token");
        }
        //토큰 불러와서 id 가져오기
        const token = tokenString.replace("Bearer ","");
        
        jwt.verify(token,JWT_SECRET_KEY,(error,payload)=>{
            if(error){
                throw new Error(error.message);
            }
            // console.log("payload??? ", payload);
            // payload???  { _id: '671654c6bb6b01e926e5dcc1', iat: 1729600438, exp: 1729686838 }
            // res.status(200).json({status:"success", userId:payload._id})
            req.userId = payload._id;
        });
        
        next(); //userController.getUser로 넘어감
    } catch (error) {
        res.status(400).json({status:"fail", message:error.message});
    }
}

module.exports = authController;