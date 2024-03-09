const mongoose = require("mongoose")
const URL = 'mongodb+srv://aryanjangir1309:aryan1309@cluster0.du6sopg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const mongoDB = async () => {

    try {
        await mongoose.connect(URL,{useNewUrlParser: true})
        console.log("MongoDB is Connected Successfully")
    } catch (error) {
        console.log(error)
    }

}

module.exports = mongoDB
