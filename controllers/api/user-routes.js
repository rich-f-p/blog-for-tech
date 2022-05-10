const router = require('express').Router();
const {User} = require('../../model');
// post user information to database
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
        res.status(200).json(userData);
      });
    } catch (err) {
        res.status(400).json(err);
    }
  });
// post login info to logged the user into their account
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { name: req.body.name } });
      if (!userData) {
        res.status(400).json({ message: 'Incorrect username or password'});
        return;
      }
      const checkPassword = await userData.checkPassword(req.body.password);
      if (!checkPassword) {
        res.status(400).json({ message: 'Incorrect password'});
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
        res.json({ user: userData, message: 'Successfully logged in!' });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  // end session and logout user
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
      });
    } else {
        res.status(404).end();
    }
  });
  
  module.exports = router;

