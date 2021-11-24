import connectDB from '../../middleware/mongodb';
import User from '../../models/user';
import authenticate from '../../middleware/authenticate';

const usersAPI = async (req, res) => {
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support POST' });
    case 'GET':
      try {
        const users = await User.find({}).lean().exec();
        return res.status(200).json(users)        
      } catch (error) {
        return res.status(400).json("failed to get users data")        
      }

    default:
      break
  } 
}

export default authenticate(connectDB(usersAPI))