const User = require("../model/User");
const bcrypt = require("bcrypt"); //암호화에 필요한 bcrypt
const saltRounds = 10; //암호화 횟수 지정

const userConroller = {}; //객체 타입

//회원가입
userConroller.createUser = async(req,res)=>{
    try{
        const {email,name,password} = req.body; //req body에 유저가 입력한 정보가 담겨 넘어 옴.
        
        //기존 user인지 확인
        const user = await User.findOne({email:email});
        //const user = await User.findOne({email});
        if(user){
            throw new Error('이미 가입이 된 유저입니다.');
        }
        
        //암호화
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        console.log("hash:",hash);

        //새 유저 정보 저장
        const newUser = new User({email,name,password:hash});
        await newUser.save();
        
        res.status(200).json({status:"success"});

    }catch(error){
        res.status(400).json({status:"fail", message:error.message});
    }
}

//로그인
userConroller.loginWithEmail = async(req,res) => {
    try{
        const{email,password} = req.body;
        const user = await User.findOne({email},"-createdAt -updatedAt -__v"); //이메일을 통해 db에 저장된 유저 정보 가져오기

        if(!email){
            throw new Error("이메일을 입력하세요.");
        }

        if(!password){
            throw new Error('패스워드를 입력하세요.');
        }
        
        //해당 이메일의 유저가 존재함
        if(user){
            const isMatch = bcrypt.compareSync(password, user.password);
            //비밀번호가 일치함
            if(isMatch){
                //토큰 발행 => user model에서 생성. 토큰은 유저와 관련이 있는 정보이며 다른 곳에서 쓸 가능성이 있기 때문에 모델에서 만든다.
                const token = user.generateToken();
                return res.status(200).json({status:"success", user, token});
            }else{
                throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
            }
        }else{
            throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");            
        }
    }catch(error){
        res.status(400).json({status:"fail", message:error.message});
    }
}

userConroller.getUser = async (req,res) => {
    try {
        const {userId} = req; //req.userId;
        const user = await User.findById(userId);

        if(!user){
            throw new Error("can not find user");
        }

        res.status(200).json({status:"success", user});

    } catch (error) {
        res.status(400).json({status:"fail", message:error.message});
    }
}
module.exports = userConroller;

//미들웨어