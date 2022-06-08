const User = require("../models/users")

//const generateJWT=require("../helper/generateJWT")
// const generateId=require('../helper/generateId')

//Get All Users
const getUsers = async (req, res)=>{
    const users = await User.find()
    res.json(users)
}

//Get User
const getUser = (req, res)=>{
    const {id} = req.params
    User.findById(id).then(user => {
        res.json(user)
    }).catch(err => {
        res.status(500)
    })
}

//Get User con Posts
const getUserPosts = async (req, res)=>{
    const {id} = req.params
    const user = await User.findById(id).populate('posts', {})
    res.json(user)
}


//Post User
const postUser = async (req, res)=>{
    const {email} = req.body
    const userExist= await User.findOne({email})

    if(userExist){
        const error= new Error('Usuario ya registrado')
        return res.status(400).json({msg: error.message})
    }

    try {
        const user= new User(req.body)
        const savedUser= await user.save()
    res.json(savedUser)

    } catch (error) {
        console.log(error)
    }
    

}

//Soft Delete User
const availableUser = (req, res)=>{
    const {id} = req.params
    User.findById(id).then((user)=>{
        User.findOneAndUpdate(id, {active: !user.active}).then(result =>{
            res.status(204)
        })
    })
}


//Update User
//Cambiar : Añadir cambiar foto
const updateUser = async (req, res)=>{
    //* Forma Buena no funca
    // const { id, name, email, role} =req.body;
    // //buscar usuario
    // const user = await User.findById(id).catch(err => res.status(404).json({msg: 'El usuario no existe'}));
 
    // if(user) {
    //     await User.findOneAndUpdate({id}, {name, email, role})
    //     res.json("Datos del usuario actualizado")
    // }

    const { id, name, email, role} =req.body;
    //buscar usuario
    //const user = await User.exists({ _id: id });  // .catch(err => res.status(404).json({msg: 'El usuario no existe'}));
    User.countDocuments({_id: id}, async function (err, count){ 
        if(count>0){     
                const user = await User.findOneAndUpdate({id}, {name, email, role})
            res.json(user)
        }else{
            const error= new Error('El usuario no existe')
            return res.status(404).json({msg: error.message})
        }}); 
    
}
    

//Filter User
const filterUser = async (req, res)=>{
    let {term} = req.params
    term = new RegExp(term, 'i')
    User.find({name: term }).then(result =>{
        res.json(result)
    }).catch(e =>{
        console.log(e)
    })
}
const userAuthenticate =async (req, res)=>{
    
    const {email, password} =req.body;
    //buscar usuario
    const user = await User.findOne({email});
    if (!user){
        const error= new Error('El usuario no existe')
        return res.status(404).json({msg: error.message})
    }
    //si tiene una cuenta activada
    if (!user.active){
        const error= new Error('tu cuenta esta desactivada')
        return res.status(404).json({msg: error.message})
    }
    if (await user.checkPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            role: user.role
        })
    }else{
        const error= new Error('Contraseña incorrecta')
        return res.status(403).json({msg: error.message})
    }

}
const changeUserPassword =async (req, res)=>{
    
    const { email, password, newPsw} =req.body;
    //buscar usuario
    const user = await User.findOne({email});
    if (!user){
        const error= new Error('El usuario no existe')
        return res.status(404).json({msg: error.message})
    }else{
        if(await user.checkPassword(password)){
            await User.findOneAndUpdate({email}, {password: newPsw})
            res.json(
                "Contraseña del usuario actualizada")
        
        }else{
            const error= new Error('Contraseña incorrecta')
            return res.status(403).json({msg: error.message})
        }
        
    }
    

}

module.exports= {getUsers, getUser, getUserPosts, postUser, updateUser, availableUser, filterUser, userAuthenticate, changeUserPassword };
