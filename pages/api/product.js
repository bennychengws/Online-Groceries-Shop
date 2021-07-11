import connectDB from '../../middleware/mongodb';
import Product from '../../models/product';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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
      return res.status(200).json({ name: 'John Doe' })
    default:
      break
  } 
}

export default connectDB(productAPI)