import connectDB from '../../../middleware/mongodb';
import User from '../../../models/user';
import authenticate from '../../../middleware/authenticate';
// import dbConnect from '../../utils/dbConnect';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect();

const userAccountAPI = async (req, res) => {
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get' });
    case 'PUT':
      try {
        console.log("Put method")
        console.log(req.body)
        const { username, email } = req.body.formData
        console.log(email)
        console.log(username)
        await User.updateOne({email: email}, {$set: {username: username}}) 
        return res.status(200).json({message: 'Username updated successfully', success: true});
      } catch(error) {
        return res.status(400).json({message: new Error(error).message, success: false,});
      }
    case 'GET':
      try {
        const { email } = req.query
        console.log(email)
        // const users = await User.find({}).lean().exec();
        const user = await User.findOne({email: email}).lean().exec();
        return res.status(200).json(user)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default authenticate(connectDB(userAccountAPI))