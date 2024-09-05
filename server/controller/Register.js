const UserModel = require("../model/UserModel");
const bcrypt=require("bcryptjs")
exports.register = async (req, res) => {
  try {
    const { email, password, name, profile_pic } = req.body;
    const checkMail = await UserModel.findOne({ email });
    if (checkMail) {
      return res
        .status(400)
        .send({ message: "user alredy registered", error: true });
    }
    const hashpass=await bcrypt.hash(password,10)
    const user=new UserModel({email,password,name,profile_pic})
    user.password=hashpass
    const userSave=await user.save()
    res.status(200).json({
      message:"user registered successfully",
      data:userSave,
      success:true
    })

  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || error, error: true });
  }
};
