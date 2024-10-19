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
const { searchUser } = require("../controller/searchUser");
router.route("/register").post(register);
router.route("/email").post(checkemail);
router.route("/password").post(checkPassword);
router.route("/getUser").post(getDetailsFromTheToken);
router.route("/logout").get(logout);
router.route("/updateUser").post(updateUser);
router.route("/search-user").post(searchUser)
module.exports=router
