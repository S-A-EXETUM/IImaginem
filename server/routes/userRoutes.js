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
router.post('/users/update', user.updateUser)
//SOFT DELETE USER
router.delete('/users/:id', user.availableUser)
//FILTRAR POR CADENA DE TEXTO (Filtrar User)
router.get('/users/search/:term', user.filterUser)
//USER AUTHENTICATE
router.post('/users/authenticate', user.userAuthenticate)
//CHANGE PASSWORD
router.post('/users/password', user.changeUserPassword)

module.exports = router