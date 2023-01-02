import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
  } from "../constants/cartConstant";

  export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
        console.log(item);
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
        /*const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );*/
         //const isItemExist=false;

        if (isItemExist) {
          console.log("isItemExit");
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          console.log("Isitemnotexist");
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
  
      default:
        return state;
    }
  };
  