// controllers/order.controllers.js

// The PayPal SDK doesn't export the request classes directly.
// We need to import the whole SDK object and access the classes from the nested 'orders' object.
const paypal = require('@paypal/checkout-server-sdk');
const client = require('../config/paypal')();
const Order = require('../models/order.model');
const Cart = require("../models/cart.model");
const Product=require("../models/product.model")
async function createOrderController(req, res) {
  try {
    const {
      userId, cartItems, addressInfo, orderStatus,
      paymentMethod, paymentStatus, orderDate, updatedOrderDate,
      totalAmount, paymentId, payerId, cartId
    } = req.body;

    // Correctly create the request by accessing the class from the paypal.orders namespace.
    
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: "CAPTURE",
      payer: {
        payment_method: "PAYPAL",
      },
      purchase_units: [
        {
          description: "Ecommerce Order Checkout",
          amount: {
            currency_code: "USD",
            value: Number(totalAmount).toFixed(2),

            breakdown: {
              item_total: {
                currency_code: "USD",
                value: Number(totalAmount).toFixed(2),

              }
            }
          },
          items: cartItems?.map(item => ({
            name: item.title,
            sku: item.productId,
            unit_amount: {
              currency_code: "USD",
              value:Number(item.price).toFixed(2)
            },
            quantity: item.quantity.toString()
          }))
        }
      ],
      application_context: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel"
      }
    });

    const orderResponse = await client.execute(request);

    const newlyCreated = await Order.create({
      userId, cartItems, addressInfo, orderStatus,
      paymentMethod, paymentStatus, totalAmount:Number(totalAmount), orderDate, updatedOrderDate,
      paymentId: orderResponse?.result?.id, payerId, cartId
    });

    const approvalUrl = orderResponse.result.links.find(l => l.rel === 'approve').href;

    res.status(201).json({
      success: true,
      approvalUrl,
      orderId: newlyCreated._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating PayPal order"
    });
  }
}

async function captureOrderController(req, res) {
  try {
    const { orderId, payerId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    for(let item of order.cartItems)
    {
      let product=await Product.findById(item?.productId)
      if(!product)
      {
        return res.status(404).json({
          success:false,
          message:"product not found"
        })
      }
      product.totalStock-=item?.quantity
      await product.save()
    }
    order.payerId=payerId
    order.orderStatus = "confirmed";
    order.paymentStatus = "paid";
    await Cart.findByIdAndDelete(order.cartId);
    await order.save();
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong"
    });
  }
}
const getAllOrdersByUserController=async(req,res)=>{
  try {
    const {userId}=req.params
    const orders=await Order.find({userId})
    if(!orders)
    {
      return res.status(404).json({
        successs:false,
        message:"No orders found"
      })
    }
    res.status(200).json({
      success:true,
      orders
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong"
    });
  }
}
const getOrderDetailsByOrderIdController=async(req,res)=>{
  try {
    const {orderId}=req.params
    const order=await Order.findById(orderId)
    if(!order)
    {
      return res.status(404).json({
        success:false,
        message:"No order found"
      })
    }
    res.status(200).json({
      success:true,
      order
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong"
    });
  }
}

module.exports = { createOrderController, captureOrderController,getAllOrdersByUserController,getOrderDetailsByOrderIdController };
