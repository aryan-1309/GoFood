const Order = require('../models/OrderModels');

const orderDataController = async (req, res) => {
    try {
        let data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date });

        let existingOrder = await Order.findOne({ email: req.body.email });
        
        if (!existingOrder) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.status(201).send({ success: true, message: `Check Out Successful!` });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.status(201).send({ success: true, message: `Check Out Successful!` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: `Something went wrong while Check Out` });
    }
};

module.exports = { orderDataController };
