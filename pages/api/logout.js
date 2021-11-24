import connectDB from '../../middleware/mongodb';
import cookie from 'cookie';
import authenticate from '../../middleware/authenticate';

const logoutAPI = async (req, res) => {
  switch (req.method) {
    case 'POST':
      res.setHeader('Set-Cookie', [
        cookie.serialize('auth', '', {
          maxAge: -1,
          path: '/',
        }),
      ]);
      return res.status(200).json({ message: 'Logout' });
      // return res.status(405).json({ message: 'We only support GET' });
    case 'GET':
      return res.status(405).json({ message: 'We only support POST' });
  }
}

export default authenticate(connectDB(logoutAPI))

