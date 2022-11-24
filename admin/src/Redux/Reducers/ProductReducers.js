import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_ISACTIVE_FAIL,
  PRODUCT_ISACTIVE_REQUEST,
  PRODUCT_ISACTIVE_RESET,
  PRODUCT_ISACTIVE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductConstants";

//  All products
export const productListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, data: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, data: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//  Delete products
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//  Create products
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//  Edit products
export const productEditReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_EDIT_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//  Update products
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {product:{}};
    default:
      return state;
  }
};
//  Update products isActive
export const productIsaActiveReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ISACTIVE_REQUEST:
      return { loading: true };
    case PRODUCT_ISACTIVE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_ISACTIVE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ISACTIVE_RESET:
      return {};
    default:
      return state;
  }
};
