const { model, Schema } = require('mongoose')


const postSchema = Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    commentUser: {
        //Array = [ {id, comment}, {id, comment} ]
        type: Array,
        required:true,
        trim:true,
    },
    //Privacidad
    active:{
        type:Boolean,
        default:true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //Cambiar tipo
    image:{
        type: String
    }
   
})

//Elimina atributos innecesarios al devolver de la BD
postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Post = model('Post', postSchema)

module.exports = Post