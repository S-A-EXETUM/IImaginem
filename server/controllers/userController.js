const User = require("../models/users")

//const generateJWT=require("../helper/generateJWT")
// const generateId=require('../helper/generateId')

//Get All Users
const getUsers = async (req, res)=>{
    const users = await User.find()
    res.json(users)
}

//Get User
const getUser = async (req, res)=>{
    const {id} = req.params
    const user = await User.findById(id)
    res.json(user)
}

//Get User con Posts
const getUserPosts = async (req, res)=>{
    const {id} = req.params
    const user = await User.findById(id).populate('posts', {})
    res.json(user)
}


//Post User
const postUser = async (req, res)=>{
    const user= new User(req.body)
    const savedUser= await user.save()
    res.json(savedUser)
    

}

//Delete User
const deleteUser = async(req, res)=>{


}

//Update User
const updateUser = async (req, res)=>{

    

}

//Filter User
const filterUser = async (req, res)=>{
    let {searchTerm} = req.params
    searchTerm = new RegExp(searchTerm, 'i')
    User.find({nombre: searchTerm }).then(result =>{
        res.json(result)
    }).catch(e =>{
        console.log(e)
    })
}

module.exports= {getUsers, getUser, getUserPosts, postUser, updateUser, deleteUser, filterUser};
