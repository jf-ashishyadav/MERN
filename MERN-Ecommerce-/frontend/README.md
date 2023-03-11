## create react app

==> npx create-react-app . 

 =>use  dot for install direct 

 ==> npm start : for run project 

 => some packages install
npm i axios (backend data fatch)
npm i react-alert 
npm i react-alert-templete-basic 
npm i react-helmet (for different title )
npm i react-redux 
npm i redux
npm i redux-thunk
npm i redux-devtools-extension
npm i react-router-dom
npm i overlay-navbar 
npm i react-icons
npm i webfontloder (for fonts)


##

rfce for boler plate code 
## import tant point 

<></> or <fragement> </fragement>: both are same empty tag

## header 
=>overlay-navbar from npm so see documention

## fonts use 

npm i webfontloader


## routing : basically need both togather router,routes,route
   <!-- <Router>
    <Header/>
    <Routes>
    <Route extact path="/" component={Home}></Route>
    </Routes>
    <Footer/>
    </Router> -->


## rating :
npm i react-rating-stars-component

## halmet

user for pass title 


## redux 
normally inreact we pass data with chain but by redex we make a store so i can share data any componet directly 

##  Add redux for making store
=> add redux dev tool exrnstion 
=> import and uses for store
<!-- import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk"; 
import {composeWithDevTools} from "redux-devtools-extension";
// we use combine reducer because we need to fatch many things like packages etc
const reduser = combineReducers({
})
let initialState = {}
const middleWare = [thunk];
const store = createStore(reduser,initialState,composeWithDevTools(applyMiddleware(...middleWare)))
export default store; -->


=> index.js: add provider and store
<!-- import {Provider} from "react-redux";
import store from './store'; -->

=> index.js: remove <React.StrictMode> and pass provider


==========================================================================================================
## redux needs 
=> need three things for reducer, so we are making three folder in src folder
1- reducer
2-action
3-constent(not mendtary but needness maintain )

=> reducer => productReducer.js


# Productconstant.js:make some constant var for state

<!-- export const All_PRODUCT_REQUEST="All_PRODUCT_REQUEST";
export const All_PRODUCT_SUCCESS="All_PRODUCT_SUCCESS";
export const All_PRODUCT_FAIL="All_PRODUCT_FAIL";
export const CLEAR_ERRORS="CLEAR_ERRORS"; -->

# productReducer.js
// make reducer and handle case
<!-- import {All_PRODUCT_FAIL,All_PRODUCT_SUCCESS,All_PRODUCT_REQUEST, CLEAR_ERRORS} from "../constants/productConstant";

export const productReducer = (state={products:[]},action)=>{
switch (action.type) {
    case All_PRODUCT_REQUEST:
      return{
        loading:true,
        product:[]
      }
      case All_PRODUCT_SUCCESS:
      return{
        loading:false,
        product:action.payload.products,
        productCounts:action.payload.productsCounts
      }
      case All_PRODUCT_FAIL:
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
        return state
}
} -->


# productAction.js: call api
<!-- import axios from 'axios';
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
} -->


# so now import productAction.js in home js 
<!-- import {getProduct} from "../actions/productAction";
// but with redux we can't call directly so import this is also 
import {useSelector,useDispatch} from "react-redux" -->


const Home = () => {

  <!-- const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getProduct());
  }, [dispatch]) -->
  ===================================================================================================================

  # now test on devtoll 
  => but it was not shwoing because both server frontented and backend running different port so in frontented addd proxy 
  in package,json 

  ====Package.json

   <!-- "proxy":"http://192.168.0.103:4000" -->


   

   5:44:11