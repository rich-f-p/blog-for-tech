const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const commentRoutes = require('./comment-routes');

router.use('/comment', commentRoutes)
router.use('/users', userRoutes);
router.use('/blog', blogRoutes)

module.exports = router;