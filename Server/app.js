const express = require("express")
const app = express()
const mongoDB = require("./db")
mongoDB()

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello my food")
})

app.use('/api',require("./Routes/CreateUser"))

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`Backend Server Is Running on PORT ${PORT}`)
})