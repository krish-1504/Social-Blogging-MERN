const mn=require('mongoose')


const userSchema=new mn.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const UserModel=mn.model('User',userSchema)

module.exports =UserModel;