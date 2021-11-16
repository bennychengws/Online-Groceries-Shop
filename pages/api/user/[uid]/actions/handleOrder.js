import connectDB from "../../../../../middleware/mongodb";
import User from "../../../../../models/user";
import Product from "../../../../../models/product";
import authenticate from "../../../../../middleware/authenticate";
import mongoose from "mongoose";
// import dbConnect from '../../utils/dbConnect';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect();

const handleOrderAPI = async (req, res) => {
  var { uid } = req.query;
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get, Put, and Delete' });
    case "PUT":
      try {
        console.log("Put method");
        console.log(req.body);
        // let newOrder = {
        //     orderId: mongoose.Types.ObjectId()
        // }
        const { _id } = req.body;
        await User.updateOne({ _id: uid }, { $addToSet: { orders: req.body } });        
        let idArray = [];
        for (var i = 0; i < req.body.items.length; i++) { idArray.push(req.body.items[i]._id);}
        await Product.updateMany({ _id: { $in: idArray } }, { $addToSet: { orders: _id }});
        await Product.updateMany({ _id: { $in: idArray } }, { $inc: { totalSalesOrderNumber: 1 }});
        return res.status(200).json({message: "The Product is successfully ordered", success: true,});
      } catch (error) {
        console.log("an error occured");
        return res.status(400).json({ message: new Error(error).message, success: false });
      }
    case 'DELETE':
      try {
        console.log("Delete method")
        console.log(req.body)
        const { _id } = req.body;
        await User.updateOne({_id: uid}, {$pull: {orders: {_id: req.body}}})
        let idArray = [];
        for (var j = 0; j < req.body.items.length; j++) { idArray.push(req.body.items[j]._id);}
        // await Product.updateMany({_id: req.body}, {$pull: {orders: uid}})
        await Product.updateMany({ _id: { $in: idArray } }, { $pull: { orders: _id }});
        await Product.updateMany({ _id: { $in: idArray } }, { $inc: { totalSalesOrderNumber: -1 }}); 
        return res.status(200).json({message: 'The Product is successfully deleted from order', success: true});
      } catch(error) {
        return res.status(400).json({message: new Error(error).message, success: false,});
      } 
    case "GET":
      try {
        // const user = await User.find({ _id: uid }, { orders: 1 }).populate("orders._id", ['name', 'amountPerQty', 'price', 'productImage']).lean().exec();
        const user = await User.find({ _id: uid }, { orders: 1 }).lean().exec(); 
        const [{ orders }] = user;       
        // var [{ cart }] = user;
        // var flattenedCart = cart.flatMap(
        //   (i) => i._id
        // )
        // for (var j = 0; j < flattenedCart.length; j++) {
        //   flattenedCart[j].quantity = cart[j].quantity
        // }  
        // return res.status(200).json(flattenedCart);
        return res.status(200).json(orders);
      } catch (error) {
        return res.status(400).json("failed to get users data");
      }

    default:
      break;
  }
};

export default authenticate(connectDB(handleOrderAPI));
