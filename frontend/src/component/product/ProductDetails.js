import React,{ Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
import {useSelector,useDispatch} from "react-redux"
import {getProductDeatils} from "../../actions/productAction"
const ProductDetails = ({match}) => {

    const dispatch=useDispatch();
    
    const {product,loading,error}=useSelector(state=>state.productDetails)

    useEffect(()=>{
       dispatch(getProductDeatils(match.params.id))
    },[dispatch,match.params.id])
  return (
    <Fragment>
        <div className='ProductDetails'>

         gone

        </div>
    
    </Fragment>
  )
}

export default ProductDetails
