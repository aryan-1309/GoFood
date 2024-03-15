const mongoose = require("mongoose")

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.URL, { useNewUrlParser: true })
        console.log("MongoDB is Connected Successfully")

        const fetched_data = await mongoose.connection.db.collection("food_items")
        const data = await fetched_data.find({}).toArray()

        const fetched_catData = await mongoose.connection.db.collection("foodCategory")
        const catData = await fetched_catData.find({}).toArray()

        global.foodCategory = catData
        global.food_items = data

    } catch (error) {
        console.error('Error while fetching data of food_items collection:', error.message)
    }
}

module.exports = mongoDB
