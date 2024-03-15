const express = require("express")
const app = express()
const mongoDB = require("./db")
const dotenv = require("dotenv")
const cors = require('cors')

dotenv.config()

mongoDB() // MongoDB connection

app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Hello my food")
})

app.use('/api',require("./Routes/userRoutes"))
app.use('/api',require("./Routes/foodDataRoute"))


app.listen(process.env.PORT,()=>{
    console.log(`Backend Server Is Running on PORT ${process.env.PORT}`)
})