import connectDB from '../../../middleware/mongodb';
import Product from '../../../models/product';

const categoryAPI = async (req, res) => {

  switch (req.method) {
    case 'POST':
      return res.status(405).json("We only support GET")
    case 'GET':
      try {
        const { category } = req.query
        console.log("req: " + category);
        const product = await Product.find({categoryTags: category}).lean().exec();
        return res.status(200).json(JSON.stringify(product))        
      } catch (error) {
        return res.status(400).json("failed to get products data")        
      }

    default:
      break
  } 
}

export default connectDB(categoryAPI)