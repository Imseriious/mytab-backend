const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const token = req.cookies.refreshToken; // Assuming 'refreshToken' is the name of your cookie

  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const { _id } = jwt.verify(token, process.env.REFRESH_SECRET);

    req.user = await User.findOne({ _id }).select('_id');
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
