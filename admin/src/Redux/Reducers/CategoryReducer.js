import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_RESET,
  CATEGORY_EDIT_FAIL,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_ISACTIVE_FAIL,
  CATEGORY_ISACTIVE_REQUEST,
  CATEGORY_ISACTIVE_RESET,
  CATEGORY_ISACTIVE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../Constants/CategoryConstants";

//  All Categorys
export const categoryListReducer = (state = { categorys: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categorys: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categorys: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Single category deatails
export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

//  Create categorys
export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//  Update category isActive
export const categoryIsaActiveReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ISACTIVE_REQUEST:
      return { loading: true };
    case CATEGORY_ISACTIVE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_ISACTIVE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_ISACTIVE_RESET:
      return {};
    default:
      return state;
  }
};

//  Delete category
export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//  Edit category
export const categoryEditReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_EDIT_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_EDIT_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
