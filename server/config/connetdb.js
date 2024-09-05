const mongoose =require("mongoose")

const  connectDb=async()=>{
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to the database");
      })
      .catch((error) => {
        console.error("Error connecting to the database", error);
      });
}
module.exports=connectDb
