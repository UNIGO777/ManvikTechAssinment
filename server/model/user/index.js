const mongoose = require('mongoose')


const userScema =  mongoose.Schema({
    email : {
        type : String,
        require : true,
        unique: true
    },
    name: {
        type : String,
        require : true
    },
    phone: {
        type : String,
        require : true,
        unique: true
    },
    password: {
        type : String,
        require : true
    }
    
})

const userModel = mongoose.model('User', userScema)


module.exports = userModel