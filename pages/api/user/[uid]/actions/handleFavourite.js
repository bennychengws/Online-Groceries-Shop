import connectDB from '../../../../../middleware/mongodb';
import User from '../../../../../models/user';
import Product from '../../../../../models/product';
import authenticate from '../../../../../middleware/authenticate';

const handleFavouriteAPI = async (req, res) => {
  var { uid } = req.query
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get, Put, and Delete' });
    case 'PUT':
      try {
        console.log("Put method")
        await User.updateOne({_id: uid}, {$addToSet: {favourite: req.body}}) 
        await Product.updateOne({_id: req.body}, {$addToSet: {likedBy: uid}}) 
        return res.status(200).json({message: 'The Product is successfully added to favourite', success: true});
      } catch(error) {
        return res.status(400).json({message: new Error(error).message, success: false,});
      }
    case 'DELETE':
      try {
        console.log("Delete method")
        await User.updateOne({_id: uid}, {$pull: {favourite: req.body}}) 
        await Product.updateOne({_id: req.body}, {$pull: {likedBy: uid}}) 
        return res.status(200).json({message: 'The Product is successfully deleted from favourite', success: true});
      } catch(error) {
        console.log("an error occured")
        return res.status(400).json({message: new Error(error).message, success: false,});
      } 
    case 'GET':
      try {

        const user = await User.find({_id: uid}, {favourite: 1}).populate('favourite', ['name', 'amountPerQty', 'discountedPrice', 'productImage']).lean().exec();
        const [{favourite}] = user
        return res.status(200).json(favourite)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default authenticate(connectDB(handleFavouriteAPI))