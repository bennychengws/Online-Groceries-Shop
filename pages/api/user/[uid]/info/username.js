import connectDB from '../../../../../middleware/mongodb';
import User from '../../../../../models/user';
import authenticate from '../../../../../middleware/authenticate';
// import dbConnect from '../../utils/dbConnect';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect();

const usernameAPI = async (req, res) => {
  var { uid } = req.query
  console.log(uid)
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get and Put' });
    case 'PUT':
      try {
        console.log("Put method")
        // console.log(req.body)
        const { username } = req.body
        // console.log(username)
        await User.updateOne({_id: uid}, {$set: {username: username}}) 
        return res.status(200).json({message: 'Username updated successfully', success: true});
      } catch(error) {
        return res.status(400).json({message: new Error(error).message, success: false,});
      }
    case 'GET':
      try {
        // const users = await User.find({}).lean().exec();
        const user = await User.findOne({_id: uid}, {username: 1}).lean().exec();
        return res.status(200).json(user)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default authenticate(connectDB(usernameAPI))