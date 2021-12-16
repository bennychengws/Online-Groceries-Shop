import dbConnect from '../../../../../lib/dbConnect';
import User from '../../../../../models/user';
import authenticate from '../../../../../middleware/authenticate';

const usernameAPI = async (req, res) => {
  var { uid } = req.query
  await dbConnect();
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get and Put' });
    case 'PUT':
      try {
        console.log("Put method")
        const { username } = req.body
        await User.updateOne({_id: uid}, {$set: {username: username}}) 
        return res.status(200).json({message: 'Username updated successfully', success: true});
      } catch(error) {
        return res.status(400).json({message: new Error(error).message, success: false,});
      }
    case 'GET':
      try {
        const user = await User.findOne({_id: uid}, {username: 1}).lean().exec();
        return res.status(200).json(user)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default authenticate(usernameAPI);