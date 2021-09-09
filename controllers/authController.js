const User = require('../models/User');
const bcrypt = require('bcrypt');
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
        if (user) {
         const validPassword = await bcrypt.compare(password, user.password );
            if (validPassword) {
              // USER SESSION
              res.status(200).send('YOU ARE LOGGED IN');
            }else{
                res.status(400).json({ error: "Invalid Password" });
              }
          }else{
            res.status(401).json({ error: "User does not exist" });
          }
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };
  
