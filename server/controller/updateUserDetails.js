const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");

exports.updateUser = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    if (!token) {
      return res.send({
        success: false,
        message: "user need to login",
      });
    }
    const getUser = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findOneAndUpdate({ _id: getUser.id.id },req.body)
    res.status(200).json({
        success:true,
        message:"user update sucess",
        user:user
    })
  } catch (error) {
    res.status(500).send({
      message: error.message || error,
      error: true,
    });
  }
};