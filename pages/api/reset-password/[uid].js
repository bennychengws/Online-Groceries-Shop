import connectDB from "../../../middleware/mongodb";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import mail from "@sendgrid/mail";
import Jwt from "jsonwebtoken";
import getConfig from "next/config";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

mail.setApiKey(process.env.SENDGRID_API_KEY);

const resetPassword = async (req, res) => {
  // const users = await User.find({}).lean().exec();
  switch (req.method) {
    case "PUT":
      try {
        const { _id, newPassword } = req.body
        console.log(_id)
        console.log(newPassword)
        const hashedPassword = bcrypt.hashSync(newPassword, 10)
        console.log("hashed")
        await User.updateOne({_id: _id}, {$set: {password: hashedPassword}}) 
        return res.status(200).json({message: "The password is successfully changed", success: true,}); 
      } catch (error) {
        return res.status(400).json("failed to put users data");
      }
    case "GET":
      console.log(req.query);
      const { uid } = req.query;
      console.log(uid);
      try {
        const user = await User.findOne({ _id: uid }, { password: 1 })
          .lean()
          .exec();
        return res.status(200).json(user);
      } catch (error) {
        return res.status(400).json("failed to get users data");
      }
    default:
      break;
  }
};

export default connectDB(resetPassword);
