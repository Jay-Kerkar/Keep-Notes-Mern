const mongoose = require('mongoose')
const constant_variables = require('./constant_variables')
const mongooseURI = constant_variables.mongooseURI

const connectToMongoDB = () => {
    mongoose.connect(mongooseURI, () => {
        console.log("Connected To MongoDB Successfully");
    })
}

module.exports = connectToMongoDB