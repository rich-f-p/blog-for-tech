const router = require('express').Router();
const {Comment} = require('../../model/');
const userAuth = require('../../utils/user-auth');

router.post('/', userAuth, async (req, res) =>{
    try{
        const createComment = await Comment.create({
            ...req.body,
            user_id:req.session.user_id,
            username:req.session.name
        });
        res.status(200).json(createComment);
    }catch(err){
        res.status(400).json(err);
    }
});

router.delete('/:id',userAuth,  async (req,res) => {
    try {
        const commentDelete = await Comment.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
    
    if (!commentDelete) {
        res.status(404).json({ message: 'error, try again later' });
        return;
    }
        res.status(200).json(commentDelete);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;