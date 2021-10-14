import connectDB from '../../../middleware/mongodb';
import Product from '../../../models/product';
import authenticate from '../../../middleware/authenticate';
// import dbConnect from '../../utils/dbConnect';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect();

const syncFavouriteProductAPI = async (req, res) => {
  switch (req.method) {
    case 'POST':
      return res.status(405).json({ message: 'We only support Get and Put' });
    case 'GET':
      try {
        // console.log(req.query)
        const { param } = req.query
        // console.log(param)
        const products = await Product.find({_id: {$in: param}}).lean().exec();
        // console.log(products)
        return res.status(200).json(products)        
      } catch (error) {
        return res.status(400).json("failed to get products data")        
      }

    default:
      break
  } 
}

export default authenticate(connectDB(syncFavouriteProductAPI))