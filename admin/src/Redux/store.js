import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productIsaActiveReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducers";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryEditReducer,
  categoryIsaActiveReducer,
  categoryListReducer,
} from "./Reducers/CategoryReducer";
import { brandCreateReducer, brandDeleteReducer, brandDetailsReducer, brandEditReducer, brandIsaActiveReducer, brandListReducer } from "./Reducers/BrandReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDelever: orderDeliveredReducer,
  productIsActive: productIsaActiveReducer,
  categoryCreate: categoryCreateReducer,
  categorysList: categoryListReducer,
  categoryIsActive: categoryIsaActiveReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetails: categoryDetailsReducer,
  categoryEdit: categoryEditReducer,
  brandCreate: brandCreateReducer,
  brandsList: brandListReducer,
  brandIsActive: brandIsaActiveReducer,
  brandDelete: brandDeleteReducer,
  brandDetails: brandDetailsReducer,
  brandEdit: brandEditReducer,
});

// user Login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleavare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleavare))
);

export default store;
