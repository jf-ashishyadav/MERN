import axios from 'axios';
 //smallpostman
import {All_PRODUCT_FAIL,All_PRODUCT_SUCCESS,All_PRODUCT_REQUEST, CLEAR_ERRORS} from "../../constants/productConstant";


export const getProduct = () => async (dispatch)=>{
    try {
        dispatch({type:All_PRODUCT_REQUEST})
        const {data} = await axios.get("/api/v1/packages");
        dispatch({
            type:All_PRODUCT_SUCCESS,
            payload:data
        })
         
        
    } catch (error) {
        dispatch({
          type:  All_PRODUCT_FAIL,
          payload:error.response.data.message,
        })
        
    }
}
// for clear error
export const clearErrors = () => async (dispatch)=>{
dispatch({type:CLEAR_ERRORS})
}

