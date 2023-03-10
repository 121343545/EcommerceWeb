import { 
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT_SUCCESS, 
  LOGOUT_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE


} from "../constants/userConstants"
import axios from "axios"


//login action
export const login=(email,password)=>async(dispatch)=>{
  try {
    dispatch({type:LOGIN_REQUEST});
    
    const config={headers:{"Content-Type":"application/json"}};

    const {data}=await axios.post(
         `/api/v1/login`,
         {email,password},
         config
    );
    
    dispatch({type:LOGIN_SUCCESS,payload:data.user});

  } catch (error) {
    dispatch({type:LOGIN_FAILURE,payload:error.response.data.message})
  }
};


/*export const register=(userData)=>async(dispatch)=>{

 try {
    dispatch({type:REGISTER_USER_REQUEST})
    const config={headers:{"content-Type":"multipart/form-data"}}

    const {data}=await axios.post(`/api/v1/register`,userData,config)

    dispatch({type:REGISTER_USER_SUCCESS,payload:data.user});

 } catch (error) {
  
  dispatch({type:REGISTER_USER_FAILURE,payload:error.response.data.message})
 }



};*/

// Register
export const register = (userData) => async (dispatch) => {
  try {
    console.log("1");
    dispatch({ type: REGISTER_USER_REQUEST });
    console.log("2");
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    console.log("3");
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    console.log("4");
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    console.log("5");
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};


//Load user
export const loadUser=()=>async(dispatch)=>{
  try {
    dispatch({type:LOAD_USER_REQUEST});
    
    

    const {data}=await axios.get(
         `/api/v1/me`,
         
    );
    
    dispatch({type:LOAD_USER_SUCCESS,payload:data.user});

  } catch (error) {
    dispatch({type:LOAD_USER_FAILURE,payload:error.response.data.message})
  }
};

//Logout user
export const LOGOUT_USER=()=>async(dispatch)=>{
  try {
    

    await axios.get(
         `/api/v1/logout`,
         
    );
    
    dispatch({type:LOGOUT_SUCCESS});

  } catch (error) {
    dispatch({type:LOGOUT_FAILURE,payload:error.response.data.message})
  }
};


//UpdateProfile

export const updateProfile = (userData) => async (dispatch) => {
  try {
    
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    
    const { data } = await axios.put(`/api/v1/me/update`, userData, config);
    
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

//Update Password

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    
    const config = { headers: { "Content-Type": "application/json" } };
    
    const { data } = await axios.put(`/api/v1/password/update`, passwords, config);
    
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload: error.response.data.message,
    });
  }
};



//clearing errors
export const clearErrors =()=> async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}