const router = require('express').Router()
const user = require('../controllers/userController')

//GET USERS
router.get('/users', user.getUsers)
//GET USER  (Seguidores y Seguidos)
router.get('/users/:id/follows', user.getUser)
//GET USER & POSTS (perfil)
router.get('/users/:id', user.getUserPosts)
//POST USER
router.post('/users', user.postUser)
//UPDATE USER
router.post('/user/:id', user.updateUser)
//DELETE USER
router.delete('/users/:id', user.deleteUser)
//FILTRAR POR CADENA DE TEXTO (Filtrar User)
router.get('users/searchBy/:searchTerm', user.filterUser)

module.exports = router