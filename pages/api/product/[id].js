import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/product';

const productItemAPI = async (req, res) => {
  const { id } = req.query
  await dbConnect();
  switch (req.method) {
    case 'POST':
      return res.status(405).json("We only support GET")
    case 'GET':
      try {
        const product = await Product.findOne({_id: id}).lean().exec();
        return res.status(200).json(JSON.stringify(product))        
      } catch (error) {
        return res.status(400).json("failed to get products data")        
      }

    default:
      break
  } 
}

export default productItemAPI;