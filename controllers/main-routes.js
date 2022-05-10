const router = require('express').Router();
const { Blog, Comment, User } = require('../model');
const userAuth = require('../utils/user-auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{
                model: User,
                attributes: ['name']
            }],
        });
        const blogs = blogData.map((data) => data.get({ plain: true }));
        res.render('homepage', { 
            blogs, 
            logged_in: req.session.loggedIn 
        });
    }catch(err) {
        res.status(500).json(err);
    }
});
router.get('/blogs/:id', userAuth, async (req,res) =>{
    try {
        const blogId = await Blog.findByPk(req.params.id, {
            include: [{model: User, attributes: ['name']},{model: Comment}]
        })
        const blogs = blogId.get({plain:true});
        res.render('singleBlog',{
            blogs,
            logged_in: req.session.loggedIn
        })
    }catch(err) {
        res.status(404).json(err)
    }
});
router.get('/dashboard', userAuth, async (req,res) =>{
    try{
        const user = await User.findByPk(req.session.user_id, {
            include:[{model:Blog}]
        }) 
        const userData = user.get({ plain: true})
        res.render('dashboard',{
            userData,
            logged_in: req.session.loggedIn
        })
        console.log(userData)
    }catch(err){
        res.status(404).json(err);
    }
})
router.get('/signup', (req,res) =>{
    if(req.session.loggedIn){
        res.redirect('/dashboard');
    }
    res.render('signup')
});

router.get('/login', (req,res) =>{
    if(req.session.loggedIn){
        res.redirect('/dashboard');
        return;
    }
    res.render('login')
})

module.exports = router;