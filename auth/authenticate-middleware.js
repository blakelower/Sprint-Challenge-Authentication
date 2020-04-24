const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({
    message: 'You shall now pass!'
  })
  try {
    const verified = jwt.verify(
      token,
      process.env.TOKEN_SECRET || 'its a secret'
    );
    req.token = verified;
    next();
  } catch (error) {
    res.status(400).json({error: "Not a token"})
  }
}