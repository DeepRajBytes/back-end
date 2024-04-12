const paymetnserve = require('../services/payment.service');

const paymentController = async (req, res) => {
    console.log("Request Body:", req.body);
    try {
        const payment = await paymetnserve.paymentService(req.body);
        res.status(200).send(payment);
    } catch (error) {
        console.log(error);
        res.status(502).send(error);
    }
};

module.exports = { paymentController };
