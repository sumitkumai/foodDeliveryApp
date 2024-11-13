import express from 'express';
import Order from '../models/Oders.js';
const router = express.Router();

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  const userEmail = req.body.email;
  const date = req.body.order_date;

  try {
    // Check if the user already has an order
    const existingOrder = await Order.findOne({ email: userEmail });

    if (!existingOrder) {
      // If no order exists, create a new one
      await Order.create({
        email: userEmail,
        order_data: [{ data, date }],
      });
      return res.json({ success: true });
    }

    // If an order exists, update it by adding the new data
    await Order.findOneAndUpdate(
      { email: userEmail },
      { $push: { order_data: {data,date }} }
    );
    return res.json({ success: true });

  } catch (error) {
    console.error("Error while saving order:", error);
    res.status(500).send(error.message);
  }
});


router.post("/myOrderData", async (req, res) => {
  try {
    let myData = await Order.findOne({email:req.body.email})
    res.json({orderData:myData})
  } catch (error) {
    res.status(500).send(error.message);
  }
})

export default router;
