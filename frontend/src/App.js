
import './App.css';
import {useEffect,useState} from "react"
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import {BrowserRouter as Router,Route,  Routes} from "react-router-dom"
import webFont from "webfontloader"
import React from 'react';
import Home from './component/layout/Home/Home';

import ProductDetaileNew from './component/product/ProductDetaileNew';
import Search from './component/product/Search';
import TestProduct from './component/product/TestProduct';
import Products from './component/product/Products';
import LoginSignUp from './component/User/LoginSignUp';
import { createBrowserHistory } from 'history'
import store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions'
import { useSelector } from 'react-redux';
import Profile from '../src/component/User/Profile'
import UpdatedProfile from '../src/component/User/UpdatedProfile'
//import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdatePassword from '../src/component/User/UpdatePassword'
import ForgotPassword from '../src/component/User/ForgotPassword'
import ResetPassword from '../src/component/User/ResetPassword'
import Cart from './component/Cart/Cart'
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder"
import Payment from './component/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Good from './component/Cart/Good';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/orders/MyOrders';
import OrderDetails from './component/orders/OrderDetails';
import Dashboard from './component/admin/Dashboard.js';
import ProductList from './component/admin/ProductList'
function App() {
    
  const {isAuthenticated,user}=useSelector(state=>state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    
    console.log(stripeApiKey);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Droid Sans","chilanka"]
      }
    });
    store.dispatch(loadUser())
    getStripeApiKey();
    
  },[]);
  return (
   <Router>
     
    <Header/>
    {isAuthenticated && <UserOptions user={user} />}

    
        



    <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetaileNew/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:keyword' element={<Products/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
       {/* <Route path='/account' element={<Profile/>}/>*/}
        {isAuthenticated && <Route path='/account' element={<Profile/>}/> }
        {isAuthenticated && <Route path='/me/update' element={<UpdatedProfile/>}/> }
        {isAuthenticated && <Route path='/password/update' element={<UpdatePassword/>}/> }
        {isAuthenticated && <Route path='/shipping' element={<Shipping/>}/> }
        {isAuthenticated && <Route path='/order/confirm' element={<ConfirmOrder/>}/> }
        {isAuthenticated && <Route path='/process/payment' element={<Good/>}/> }
        {isAuthenticated && <Route path='/success' element={<OrderSuccess/>}/> }
        {isAuthenticated && <Route path='/orders' element={<MyOrders/>}/> }
        {isAuthenticated && <Route path='/order/:id' element={<OrderDetails/>}/> }
        {isAuthenticated && user.role=="admin" && <Route path='/admin/dashboard' element={<Dashboard/>}/> }
        {isAuthenticated && user.role=="user" && <Route path='/admin/dashboard' element={<Profile/>}/> }
        {isAuthenticated && user.role=="admin" && <Route path='/admin/products' element={<ProductList/>}/> }
        <Route path='/password/forgot' element={<ForgotPassword/>}/>
        <Route path='/password/reset/:token' element={<ResetPassword/>}/>
        <Route path='/cart' element={<Cart/>}/>
        
        </Routes>
   
    <Footer/>
   </Router>
  );
}

export default App;
