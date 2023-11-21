const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, getBlogIdController, deleteBlogController, userBlogController } = require('../controllers/blogController');

//router object 
const router = express.Router();

//routes
//GET || all blogs
router.get('https://word-weave-edj4.onrender.com/all-blog', getAllBlogsController);

//POST || create blog
router.post('https://word-weave-edj4.onrender.com/create-blog', createBlogController);

//PUT || update blog
router.put('https://word-weave-edj4.onrender.com/update-blog/:id', updateBlogController);

//GET || Single Blog Details
router.get('https://word-weave-edj4.onrender.com/get-blog/:id', getBlogIdController);

//DELETE || delete blog
router.delete('https://word-weave-edj4.onrender.com/delete-blog/:id', deleteBlogController);


//GET || use blog
router.get('https://word-weave-edj4.onrender.com/user-blog/:id', userBlogController);


module.exports = router;

