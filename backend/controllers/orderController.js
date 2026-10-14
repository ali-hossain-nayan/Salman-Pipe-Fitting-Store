

import Stripe from 'stripe'
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = 'http://localhost:5173'

    //create new order for user
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        await newOrder.save();//save in database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })//after saving clear the cartData



        //whatever items we get here we deal with it neccessary stripe processing
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'bdt',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 120
            },
            quantity: item.quantity
        }))



        //one more line items for delevery charges and convert it into to bdt 
        line_items.push({
            price_data: {
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: 2 * 100 * 120
            },
            quantity: 1
        })


        //after taking all of this here we create one session for stripe success or cancel 
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })


        //here we return the session url
        res.json({ success: true, session_url: session.url })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Something went wrong!!' })
    }

}

//verify the order function
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;//take the order id, succes status from body
    try {
        if (success == 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        } else {
            await orderModel.findByIdAndDelete(orderId);//if not paid orderId delete
            res.json({ success: false, message: 'Not paid!' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!!" })
    }
}

//user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!!" })
    }
}

//Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!!" })
    }
}
//updating order status
const updateOrderStatus=async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status Updated Successfully"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Something went wrong!!"})
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders,updateOrderStatus  };