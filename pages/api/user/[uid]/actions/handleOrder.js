import connectDB from "../../../../../middleware/mongodb";
import User from "../../../../../models/user";
import Product from "../../../../../models/product";
import authenticate from "../../../../../middleware/authenticate";
import mongoose from "mongoose";

const handleOrderAPI = async (req, res) => {
  var { uid } = req.query;
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get, Put, and Delete' });
    case "PUT":
      try {
        console.log("Put method");
        console.log(req.body);
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
        await Product.updateMany({ _id: { $in: idArray } }, { $pull: { orders: _id }});
        await Product.updateMany({ _id: { $in: idArray } }, { $inc: { totalSalesOrderNumber: -1 }}); 
        return res.status(200).json({message: 'The Product is successfully deleted from order', success: true});
      } catch(error) {
        return res.status(400).json({message: new Error(error).message, success: false,});
      } 
    case "GET":
      try {
        const user = await User.find({ _id: uid }, { orders: 1 }).lean().exec(); 
        const [{ orders }] = user;       
        return res.status(200).json(orders);
      } catch (error) {
        return res.status(400).json("failed to get users data");
      }

    default:
      break;
  }
};

export default authenticate(connectDB(handleOrderAPI));
