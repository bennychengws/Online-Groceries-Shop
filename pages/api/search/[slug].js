import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/product';

const searchAPI = async (req, res) => {
  await dbConnect();
  switch (req.method) {
    case 'POST':
      return res.status(405).json("We only support GET")
    case 'GET':
      try {
        const { slug } = req.query
        console.log("req: " + slug);
        var val = slug
        const product = await Product.find({name: { $regex: val, $options: 'i' } }).lean().exec();
        return res.status(200).json(JSON.stringify(product))        
      } catch (error) {
        return res.status(400).json("failed to get products data")        
      }

    default:
      break
  } 
}

export default searchAPI;