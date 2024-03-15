const fooditems = async (req,res) => { 
    try {
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false, message: `foodItems ctrl Erroring ${error.message}`})
    }
}

module.exports = {fooditems}