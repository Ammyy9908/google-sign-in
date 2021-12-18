const {model,Schema} = require('mongoose');

const user_model = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    googleId:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
})

module.exports = model('User',user_model);