import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk"; 
import {composeWithDevTools} from "redux-devtools-extension";
import { productReducer } from "./reducers/productReducer";
// we use combine reducer because we need to fatch many things like packages etc
const reduser = combineReducers({
    products:productReducer
})
let initialState = {}
const middleWare = [thunk];
const store = createStore(reduser,initialState,composeWithDevTools(applyMiddleware(...middleWare)))
export default store;