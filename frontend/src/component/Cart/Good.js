import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from 'react-router-dom';

const Good = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const alert=useAlert();
    const navigate=useNavigate();
    const dispatch = useDispatch();
//    const alert = useAlert();
    
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);
   /* const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: 1000,
        taxPrice: 12000,
        shippingPrice: 1000,
        totalPrice: 12000,
        paymentInfo:{
          id: "sample_id",
            status: "paid",
        },
        orderStatus:"paid"
      };*/
    const order={
      shippingInfo,
    orderItems:cartItems,
    
    paymentInfo:{
        id:"sample payment id",
        status:"paid"
    },
    itemsPrice:orderInfo.subtotal,
    taxPrice:orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:orderInfo.totalPrice
    
    
    }
  
    useEffect(()=>{
     if(error){
      alert.error(error);
      dispatch(clearErrors(error));
     }
    },[dispatch,error,alert])
    
    const placeOrder=()=>{
        
        console.log("order");
        dispatch(createOrder(order))
        navigate("/success")
    }
  return (
    <div>
      <button onClick={()=>{placeOrder()}}>Click to proceed payment</button>
    </div>
  )
}

export default Good
