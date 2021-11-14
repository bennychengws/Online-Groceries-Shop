import connectDB from '../../../../../middleware/mongodb';
import User from '../../../../../models/user';
import authenticate from '../../../../../middleware/authenticate';
// import dbConnect from '../../utils/dbConnect';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect();

const addressAPI = async (req, res) => {
  var { uid } = req.query
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get and Put' });
    case 'PUT':
      try {
        console.log("Put method")
        console.log(req.body)
        const { country, region, city, streetAddressLine1, streetAddressLine2 } = req.body
        console.log(uid)
        console.log(country)
        console.log(region)
        console.log(city)
        console.log(streetAddressLine1)
        console.log(streetAddressLine2)
        await User.updateOne({_id: uid}, {$set: {"address.country": country, "address.region": region, "address.city": city, "address.streetAddressLine1": streetAddressLine1, "address.streetAddressLine2": streetAddressLine2}}) 
        return res.status(200).json({message: 'Address updated successfully', success: true});
      } catch(error) {
        return res.status(400).json({message: new Error(error).message, success: false,});
      }
    case 'GET':
      try {
        console.log(uid)
        // const users = await User.find({}).lean().exec();
        const user = await User.findOne({_id: uid}, {address: 1, email: 1}).lean().exec();
        return res.status(200).json(user)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default authenticate(connectDB(addressAPI))