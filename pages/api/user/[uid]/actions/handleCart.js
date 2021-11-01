import connectDB from "../../../../../middleware/mongodb";
import User from "../../../../../models/user";
import Product from "../../../../../models/product";
import authenticate from "../../../../../middleware/authenticate";
// import dbConnect from '../../utils/dbConnect';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect();

const handleCartAPI = async (req, res) => {
  var { uid } = req.query;
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get and Put' });
    case "PUT":
      try {
        console.log("Put method");
        console.log(req.body);
        // await User.updateMany(
        //   { _id: uid },
        //   { $push: { cart: { $each: req.body } } }
        // );
        await User.updateOne(
          { _id: uid },
          { $set: { cart: req.body } }
        );        
        var idArray = [];
        for (var i = 0; i < req.body.length; i++) {
          idArray.push(req.body[i]._id);
        }
        await Product.updateMany(
          { _id: { $in: idArray } },
          { $addToSet: { addedToCartBy: uid } }
        );
        return res.status(200).json({
          message: "The Product is successfully added to cart",
          success: true,
        });
      } catch (error) {
        console.log("an error occured");
        return res
          .status(400)
          .json({ message: new Error(error).message, success: false });
      }
    case 'DELETE':
      try {
        console.log("Delete method")
        console.log(req.body)
        await User.updateOne({_id: uid}, {$pull: {cart: req.body}}) 
        await Product.updateOne({_id: req.body._id}, {$pull: {addedToCartBy: uid}}) 
        return res.status(200).json({message: 'The Product is successfully deleted from cart', success: true});
      } catch(error) {
        return res.status(400).json({message: new Error(error).message, success: false,});
      } 
    case "GET":
      try {
        const user = await User.find({ _id: uid }, { cart: 1 })
          .populate("cart._id", ['name', 'amountPerQty', 'discountedPrice', 'productImage'])
          .lean()
          .exec();
        var [{ cart }] = user;
        var flattenedCart = cart.flatMap(
          (i) => i._id
        )
        for (var j = 0; j < flattenedCart.length; j++) {
          flattenedCart[j].quantity = cart[j].quantity
        }  
        return res.status(200).json(flattenedCart);
      } catch (error) {
        return res.status(400).json("failed to get users data");
      }

    default:
      break;
  }
};

export default authenticate(connectDB(handleCartAPI));
