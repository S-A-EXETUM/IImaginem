const router = require('express').Router()
const post = require('../controllers/postController')

//GET POSTS
router.get('/posts', post.getPosts)
//GET POST
router.get('/posts/:id', post.getPost)
//POST POST
router.post('/posts', post.postPost)
//UPDATE POST
router.post('/posts/:id', post.updatePost)
//DELETE POST
router.delete('/posts/:id', post.deletePost)
//FILTRAR POR CADENA DE TEXTO (Filtrar POST)
router.get('posts/searchBy/:searchTerm', post.filterPost)

module.exports = router