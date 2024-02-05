module.exports = async function(req, res, next) {
    const apiKey = req.headers.apikey;
  
    if (apiKey !== '123456') {
      return res.status(401).send('Unauthenticated');
    }
  
    next();
  };
  