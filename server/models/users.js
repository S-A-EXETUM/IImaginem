const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    role: {
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    followers:{
        //Array = [ {_id}, {_id} ]
        type:Array
    },
    followed:{
        //Array = [ {_id}, {_id} ]
        type:Array
    },
    posts:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    // Cambiar el tipo
    profileImage:{
        type: String
    },
    //token:{
      //  type:String,
    //}
    
   
})

userSchema.pre('save', async function(next){
    
    const salt=await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt)
})

userSchema.pre('findOneAndUpdate', function(next) {
    const account = this.getUpdate();
    bcrypt.hash(account.password, 10, (err, hash) => {
        this.getUpdate().password = hash;
        next();
    })
});

userSchema.methods.checkPassword = async function (formPassword){
    return await bcrypt.compare(formPassword, this.password);
}

//Elimina atributos innecesarios al devolver de la BD
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

const User = model('User', userSchema)

module.exports = User