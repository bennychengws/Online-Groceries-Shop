import connectDB from '../../../../../middleware/mongodb';
import User from '../../../../../models/user';
import Product from '../../../../../models/product';
import authenticate from '../../../../../middleware/authenticate';
// import dbConnect from '../../utils/dbConnect';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect();

const handleCartAPI = async (req, res) => {
  var { uid } = req.query
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
        // const { addToCartItemInfo } = req.body
        // console.log(addToCartItemInfo)
        // if (addToCartItemInfo.length === 1) {
        //   await User.updateOne({email: email}, {$addToSet: {cart: addToCartItemInfo[0]}}) 
        // } else {
        await User.updateMany({_id: uid}, {$push: {cart: {$each: req.body }}}) 
        // await Product.updateOne({_id: req.body._id}, {$addToSet: {addedToCartBy: uid}}) 
        var idArray = []
        for (var i = 0; i < req.body.length; i++ ) {
          idArray.push(req.body[i]._id)
        }
        await Product.updateMany({_id: {$in: idArray}}, {$addToSet: {addedToCartBy: uid}}) 
        
        // }
        return res.status(200).json({message: 'The Product is successfully added to cart', success: true});
      } catch(error) {
        console.log("an error occured")
        return res.status(400).json({message: new Error(error).message, success: false,});
      }
    // case 'DELETE':
    //   try {
    //     console.log("Delete method")
    //     console.log(req.body)
    //     // const { username, email } = req.body.formData
    //     // console.log(email)
    //     // console.log(username)
    //     const { favouriteItemInfo } = req.body
    //     const { email } = req.query 
    //     console.log(favouriteItemInfo)
    //     await User.updateOne({email: email}, {$pull: {favourite: favouriteItemInfo}}) 
    //     return res.status(200).json({message: 'The Product is successfully deleted to favourite', success: true});
    //   } catch(error) {
    //     // console.log("an error occured")
    //     return res.status(400).json({message: new Error(error).message, success: false,});
    //   } 
    case 'GET':
      try {
        // const users = await User.find({}).lean().exec();
        const user = await User.findOne({_id: uid}, {cart: 1}).lean().exec();
        return res.status(200).json(user)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default authenticate(connectDB(handleCartAPI))