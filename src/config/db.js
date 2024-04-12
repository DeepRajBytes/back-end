const mongoose = require('mongoose')


function mongodb(){
    mongoose.connect("mongodb://localhost:27017/ecommerce")
}

module.exports = { mongodb }