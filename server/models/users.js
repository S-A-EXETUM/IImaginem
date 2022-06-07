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
        type:Number,
        default: 0
    },
    followed:{
        type:Number,
        default: 0
    },
    posts:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
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


const User = model('User', userSchema)

module.exports = User