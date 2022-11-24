import {
  BRAND_CREATE_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_RESET,
  BRAND_CREATE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DETAILS_FAIL,
  BRAND_DETAILS_REQUEST,
  BRAND_DETAILS_RESET,
  BRAND_EDIT_FAIL,
  BRAND_EDIT_REQUEST,
  BRAND_EDIT_SUCCESS,
  BRAND_ISACTIVE_FAIL,
  BRAND_ISACTIVE_REQUEST,
  BRAND_ISACTIVE_RESET,
  BRAND_ISACTIVE_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
} from "../Constants/BrandConstants";

//  All BRANDS
export const brandListReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST:
      return { loading: true, brands: [] };
    case BRAND_LIST_SUCCESS:
      return { loading: false, brands: action.payload };
    case BRAND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Single brand deatails
export const brandDetailsReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case BRAND_DETAILS_REQUEST:
      return { ...state, loading: true };
    case BRAND_DELETE_SUCCESS:
      return { loading: false, brand: action.payload };
    case BRAND_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

//  Create brands
export const brandCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_CREATE_REQUEST:
      return { loading: true };
    case BRAND_CREATE_SUCCESS:
      return { loading: false, success: true };
    case BRAND_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//  Update brand isActive
export const brandIsaActiveReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_ISACTIVE_REQUEST:
      return { loading: true };
    case BRAND_ISACTIVE_SUCCESS:
      return { loading: false, success: true };
    case BRAND_ISACTIVE_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_ISACTIVE_RESET:
      return {};
    default:
      return state;
  }
};

//  Delete brand
export const brandDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_DELETE_REQUEST:
      return { loading: true };
    case BRAND_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BRAND_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//  Edit brand
export const brandEditReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_EDIT_REQUEST:
      return { ...state, loading: true };
    case BRAND_EDIT_SUCCESS:
      return { loading: false, success: true };
    case BRAND_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
