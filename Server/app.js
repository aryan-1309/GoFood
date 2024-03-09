const express = require("express")
const app = express()
const PORT = 5000
const mongoDB = require("./db")
mongoDB()
app.get('/',(req,res)=>{
    res.send("Hello my food")
})

app.listen(PORT,()=>{
    console.log(`Backend Server Is Running on PORT ${PORT}`)
})