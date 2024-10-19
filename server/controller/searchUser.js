const UserModel = require("../model/UserModel");
exports.searchUser = async (request, response) => {
  try {
    const {search}=request.body
    // console.log(search)
    if(search===""){
        return response.status(200).json({
          message: "all user",
          data: [],
          success: true,
        });
    }
    const query=new RegExp(search,"i","g")
    const user = await UserModel.find({
     "$or": [{ name: query }, { email: query }],
    }).select("-password");

    return response.status(200).json({
      message: "all user",
      data: user,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};
