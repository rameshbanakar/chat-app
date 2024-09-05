const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.checkemail = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await UserModel.findOne({ email }).select("-password");
    if (!checkEmail) {
      return res.json({
        message: "user doesn't exist",
        error: true,
      });
    }
    res.status(200).json({
      message: "email varified",
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || error,
      error: true,
    });
  }
};

exports.checkPassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await UserModel.findById({ _id: userId });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({
        message: "password didn't match",
        error: true,
      });
    }
    const payload = { id: { id: user._id } };

    const token = await jwt.sign(payload, process.env.SECRET_KEY);
    const coockieOption = {
      http: true,
      secure: true,
    };
    return res.cookie("token", token, coockieOption).status(200).json({
      success: true,
      data: user,
      message: "login in success",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

exports.getDetailsFromTheToken = async (req,res) => {
  try {
    const token=req.cookies.token||""
    if(!token){
      return res.send({
        success:false,
        message:"user need to login"
      })
    }
    const getUser=await jwt.verify(token,process.env.SECRET_KEY)
    const user = await UserModel.findById({ _id: getUser.id.id }).select("-password");
    return res.send({
       sucess:true,
       user:user
    })
    
  } catch (error) {
    return res.status(500).send({
      messgae: error.message || error,
      error: true,
    });
  }
};

exports.logout=async(req,res)=>{
  try {
    const coockieOption = {
      http: true,
      secure: true,
    };
    return res.cookie("token", '', coockieOption).status(200).json({
      success: true,
      message: "logout is success",
    });
  } catch (error) {
    return res.status(500).send({
      messgae: error.message || error,
      error: true,
    });
  }
}
