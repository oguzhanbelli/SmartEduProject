const User = require('../models/User');

module.exports = (req, res, next) => {
  User.findById({_id:req.session.userID},(err, user) => {
    if (err || !user) {
      return res.redirect('/login');

    }
    next();

  });
};
