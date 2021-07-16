import connectDB from '../../middleware/mongodb';
import Product from '../../models/product';
// import dbConnect from '../../utils/dbConnect';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect();

const productAPI = async (req, res) => {
  console.log(req.body);
  switch (req.method) {
    case 'POST':
      const {name, category, brand, price, quanity, productDetail, nutritions, review} = req.body
      const product = new Product({
        name,
        category,
        brand,
        price,
        quantity,
        volume,
        productDetail,
        nutritions,
        review
      })
      await product.save()
      return res.status(200).json({ name: 'John Doe' })
    case 'GET':
      try {
        const products = await Product.find({}).exec();
        return res.status(200).json(products[2]["_id"])        
      } catch (error) {
        return res.status(400).json("failed to get products data")        
      }

    default:
      break
  } 
}

export default connectDB(productAPI)