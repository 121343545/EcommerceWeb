import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = ({element:element,...rest}) => {
 
    let navigate=useNavigate();
  const {loading,isAuthenticated,user}=useSelector((state)=>state.user);
    return (
    <Fragment>
        {!loading && (
            <Route 
              {...rest}
              render={(props)=>{
                if(!isAuthenticated){
                    return navigate("/login");

                }

                return < element {...props}/>
              }}
             
            
            />
        )}
    </Fragment>
  )
}

export default ProtectedRoute
