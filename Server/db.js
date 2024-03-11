const mongoose = require("mongoose")
const URL = 'mongodb+srv://aryanjangir1309:aryan1309@cluster0.du6sopg.mongodb.net/myfood?retryWrites=true&w=majority&appName=Cluster0'

const mongoDB = async () => {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log("MongoDB is Connected Successfully")

        const fetched_data = await mongoose.connection.db.collection("food_items")
        const data = await fetched_data.find({}).toArray()
        // console.log(data)
    } catch (error) {
        console.error('Error while fetching data of food_items collection:', error.message)
    }
}

module.exports = mongoDB
