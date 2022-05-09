const router = require('express').Router();
const { Blog, User } = require('../../model');
const userAuth = require('../../utils/user-auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{model: User,attributes: ['name']}],
        });
        const blogs = blogData.map((data) => data.get({ plain: true }));
        res.render('homepage', { 
            blogs, 
            logged_in: req.session.logged_in 
        });
    }catch(err) {
        res.status(500).json(err);
    }
});

router.post('/' , userAuth ,async (req,res) => {
    try {
        const createBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(createBlog)
    }catch(err) {
        res.status(400).json(err);
    }
})

router.put('/:id' , userAuth ,async (req,res) => {
    try {
        const updateBlog = Blog.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        res.status(200).json(updateBlog)
    }catch(err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', userAuth ,async (req,res) => {
    try {
        const blogDelete = await Blog.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
    
    if (!blogDelete) {
        res.status(404).json({ message: 'error' });
        return;
    }
    
        res.status(200).json(blogDelete);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router