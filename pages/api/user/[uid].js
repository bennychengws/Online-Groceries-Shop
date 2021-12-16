import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user';
import authenticate from '../../../middleware/authenticate';

const userAccountAPI = async (req, res) => {
  await dbConnect();
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get' });
    case 'GET':
      try {
        const { uid } = req.query
        const user = await User.findOne({_id: uid}, {password: 0}).lean().exec();
        return res.status(200).json(user)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default authenticate(userAccountAPI);