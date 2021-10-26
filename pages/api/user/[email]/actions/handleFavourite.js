import connectDB from '../../../../../middleware/mongodb';
import User from '../../../../../models/user';
import authenticate from '../../../../../middleware/authenticate';
// import dbConnect from '../../utils/dbConnect';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect();

const handleFavouriteAPI = async (req, res) => {
  switch (req.method) {
    // case 'POST':
    //     return res.status(405).json({ message: 'We only support Get and Put' });
    case 'PUT':
      try {
        console.log("Put method")
        console.log(req.body)
        // const { username, email } = req.body.formData
        // console.log(email)
        // console.log(username)
        // const { addToFavouriteItemInfo } = req.body
        const { email } = req.query 
        // console.log(addToFavouriteItemInfo)
        await User.updateOne({email: email}, {$addToSet: {favourite: req.body}}) 
        return res.status(200).json({message: 'The Product is successfully added to favourite', success: true});
      } catch(error) {
        // console.log("an error occured")
        return res.status(400).json({message: new Error(error).message, success: false,});
      }
    case 'DELETE':
      try {
        console.log("Delete method")
        console.log(req.body)
        // const { username, email } = req.body.formData
        // console.log(email)
        // console.log(username)
        // const { addToFavouriteItemInfo } = req.body
        const { email } = req.query 
        // console.log(addToFavouriteItemInfo)
        await User.updateOne({email: email}, {$pull: {favourite: req.body}}) 
        return res.status(200).json({message: 'The Product is successfully deleted to favourite', success: true});
      } catch(error) {
        // console.log("an error occured")
        return res.status(400).json({message: new Error(error).message, success: false,});
      } 
    case 'GET':
      try {
        const { email } = req.query
        console.log(email)
        // const users = await User.find({}).lean().exec();
        // const user = await User.find({email: email}).populate(favourite).lean().exec();
        const user = await User.populated('favourite');
        return res.status(200).json(user)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default authenticate(connectDB(handleFavouriteAPI))