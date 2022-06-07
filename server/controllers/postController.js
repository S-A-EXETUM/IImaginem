const Post = require ('../models/posts')
//Get All Posts
const getPosts = async (req, res)=>{

}

//Get Post
const getPost = async (req, res)=>{

}

//Post Post
const postPost = async (req, res)=>{
    
    

}

//Delete Post
const deletePost = async(req, res)=>{


}

//Update Post
const updatePost = async (req, res)=>{

    

}

//Filter Post
const filterPost = async (req, res)=>{
    let {searchTerm} = req.params
    searchTerm = new RegExp(searchTerm, 'i')
    Post.find({nombre: searchTerm }).then(result =>{
        res.json(result)
    }).catch(e =>{
        console.log(e)
    })
}

module.exports= {getPosts, getPost, postPost, updatePost, deletePost, filterPost};