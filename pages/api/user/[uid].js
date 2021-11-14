import connectDB from '../../../middleware/mongodb';
import User from '../../../models/user';
import authenticate from '../../../middleware/authenticate';
// import mongoose from "mongoose"

const userAccountAPI = async (req, res) => {
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get' });
    case 'GET':
      try {
        const { uid } = req.query
        // console.log(uid)
        // var _uid = mongoose.Types.ObjectId(uid)
        const user = await User.findOne({_id: uid}, {password: 0}).lean().exec();
        return res.status(200).json(user)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default authenticate(connectDB(userAccountAPI))