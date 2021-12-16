import dbConnect from '../../lib/dbConnect';
import Product from '../../models/product';
import authenticate from '../../middleware/authenticate';

const productAPI = async (req, res) => {
  await dbConnect();
  switch (req.method) {
    case 'POST':
      return res.status(405).json("We only support GET")
    case 'GET':
      try {
        const products = await Product.find({}, {likedBy: 0, addedToCartBy: 0, orders: 0, }).lean().exec();
        return res.status(200).json(products)        
      } catch (error) {
        return res.status(400).json("failed to get products data")        
      }

    default:
      break
  } 
}

export default authenticate(productAPI);