const express=require("express")
const router=express.Router()
const { register } = require("../controller/Register");
const {
  checkemail,
  checkPassword,
  getDetailsFromTheToken,
  logout,
} = require("../controller/checkEmail");
const { updateUser } = require("../controller/updateUserDetails");
router.route("/register").post(register);
router.route("/email").post(checkemail);
router.route("/password").post(checkPassword);
router.route("/getUser").get(getDetailsFromTheToken);
router.route("/logout").get(logout);
router.route("/updateUser").post(updateUser);
module.exports=router
