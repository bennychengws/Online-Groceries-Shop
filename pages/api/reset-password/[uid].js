import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY);

const resetPassword = async (req, res) => {
  await dbConnect();
  switch (req.method) {
    case "PUT":
      try {
        const { _id, newPassword } = req.body

        const hashedPassword = bcrypt.hashSync(newPassword, 10)
        console.log("hashed")
        await User.updateOne({_id: _id}, {$set: {password: hashedPassword}}) 
        return res.status(200).json({message: "The password is successfully changed", success: true,}); 
      } catch (error) {
        return res.status(400).json("failed to put users data");
      }
    case "GET":
      const { uid } = req.query;
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

export default resetPassword;
