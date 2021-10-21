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
    case 'GET':
      try {
        const { email } = req.query
        console.log(email)
        // const users = await User.find({}).lean().exec();
        const user = await User.findOne({email: email}, {password: 0}).lean().exec();
        return res.status(200).json(user)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default authenticate(connectDB(userAccountAPI))