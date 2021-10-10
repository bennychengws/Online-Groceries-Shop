import connectDB from '../../middleware/mongodb';
import cookie from 'cookie';
import authenticate from '../../middleware/authenticate';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const logoutAPI = async (req, res) => {
  switch (req.method) {
    case 'POST':
      return res.status(405).json({ message: 'We only support GET' });
    case 'GET':
      res.setHeader('Set-Cookie', [
        cookie.serialize('auth', '', {
          maxAge: -1,
          path: '/',
        }),
      ]);
      return res.status(200).json({ message: 'Logout' });
  }
}

export default authenticate(connectDB(logoutAPI))