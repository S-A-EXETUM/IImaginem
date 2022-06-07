const router = require('express').Router()
const Controller = require('../controllers/postController')
const tag= require('../controllers/tagController')

//GET TAGS
router.get('/tags', tag.getTags)
//GET TAG
router.get('/tags/:id', tag.getTag)
//POST TAG
router.post('/tags', tag.postTag)
//UPDATE TAG
router.post('/tags/:id', tag.updateTag)
//DELETE TAG
router.delete('/tags/:id', tag.deleteTag)
//FILTRAR POR CADENA DE TEXTO (Filtrar TAG)
router.get('tags/searchBy/:searchTerm', tag.filterTag)

module.exports = router