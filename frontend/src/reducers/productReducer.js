import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAILURE,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL

} from "../constants/productConstant"




export const productReducer =(state={products:[]},action)=>{

   switch (action.type) {
    case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
    return{
        loading:true,
        products:[]
    }
    
    case ALL_PRODUCT_SUCCESS:
        
    return{
        loading:false,
        products:action.payload.product,
        productCount:action.payload.productCount,
        resultPerPage:action.payload.resultPerPage,
        filteredProductsCount:action.payload.filteredProductsCount
    }
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    
    case ALL_PRODUCT_FAILURE:
        case ADMIN_PRODUCT_FAIL:
    return{
        loading:false,
        error:action.payload

    }
    case CLEAR_ERRORS:
        
        return{
            ...state,
            error:null
    
    
        }   
   
    default:
     return  state;
   }

};

export const productDetailReducer =(state={product:{}},action)=>{

    switch (action.type) {
     case PRODUCT_DETAILS_REQUEST:
         
     return{
         loading:true,
         ...state
     }
     
     case PRODUCT_DETAILS_SUCCESS:
         
     return{
         loading:false,
         product:action.payload,
         
     }
     
     case PRODUCT_DETAILS_FAILURE:
         
     return{
         loading:false,
         error:action.payload
 
     }
     case CLEAR_ERRORS:
         
         return{
             ...state,
             error:null
     
     
         }   
    
     default:
      return  state;
    }
 
 };

 export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  