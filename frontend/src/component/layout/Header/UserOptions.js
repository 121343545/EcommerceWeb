import React, { Fragment, useState } from 'react'
import "./Header.css"
import { SpeedDial,SpeedDialAction } from '@mui/material'
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";
import { LOGOUT_USER } from '../../../actions/userAction';
import { useAlert } from 'react-alert';
import { useDispatch ,useSelector} from 'react-redux';

const UserOptions = ({user}) => {

  const {cartItems} =useSelector((state)=> state.cart);

  let navigate=useNavigate();
  const alert=useAlert();
  const dispatch=useDispatch();
  

  const [open,setOpen]=useState(false);
  const options=[
    {icon:<ListAltIcon/>,name:"Orders",func:orders},
    {icon:<PersonIcon/>,name:"Profile",func:account},
    {icon:<AddShoppingCartIcon/>,name:`Cart(${cartItems.length})`,func:cart},
    {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser}
  ];
  if(user.role === 'admin'){
    options.unshift({icon:<DashboardIcon/>,name:"Dashboard",func:dashboard})
  }
  
  function dashboard(){
    navigate("/admin/dashboard")
  }
  
  function orders(){
    navigate("/orders")
  }
  
  function account(){
    navigate("/account")
  }
  function cart(){
    navigate("/cart")
  }
  function logoutUser(){
    dispatch(LOGOUT_USER());
    alert.success("LogOut Successfully");
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial
       ariaLabel='SpeedDial tooltip example'
       onClose={()=>setOpen(false)}
       onOpen={()=> setOpen(true)}
       open={open}
       direction="down"
       className='speedDial'
       style={{zIndex:"11"}}
       icon={
        <img
        className='speedDialIcon'
        src={user.avatar.url ? user.avatar.url:"/Profile.png"}
        alt="profile"
        ></img>
       }

      >

{options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen
          />
        ))}

      </SpeedDial>
      

    </Fragment>
  )
}

export default UserOptions
