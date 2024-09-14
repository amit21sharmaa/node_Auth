const jwt = require("jsonwebtoken");
const { secret } = require('../bin/auth.config');

const jwtAuth = async (req, res, next) => {
    const token = req?.cookies?.token;
    if (token) {
        try {
          const decoded = jwt.verify(token, secret);
    
          req.user = await User.findById(decoded.userId).select('-password');
    
          next();
        } catch (error) {
          console.error(error);
          res.status(401);
          throw new Error('Not authorized, token failed');
        }
      } else {
        res.status(401);
        throw new Error('Not authorized, no token');
      }
}

export {jwtAuth};