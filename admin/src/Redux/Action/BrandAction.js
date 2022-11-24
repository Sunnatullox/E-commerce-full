import axios from "axios";
import {
  BRAND_CREATE_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DETAILS_FAIL,
  BRAND_DETAILS_REQUEST,
  BRAND_EDIT_FAIL,
  BRAND_EDIT_REQUEST,
  BRAND_EDIT_SUCCESS,
  BRAND_ISACTIVE_FAIL,
  BRAND_ISACTIVE_REQUEST,
  BRAND_ISACTIVE_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
} from "../Constants/BrandConstants";
import { logout } from "./userActions";

// Get all brands
export const getbrandsList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/brands/all`, config);

    dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: BRAND_LIST_FAIL,
      payload: message,
    });
  }
};

// Single brand
export const brandDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRAND_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/brands/${id}`, config);
    dispatch({ type: BRAND_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BRAND_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create brand
export const brandsCreate = (products) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRAND_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/brands`, products, config);

    dispatch({ type: BRAND_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: BRAND_CREATE_FAIL,
      payload: message,
    });
  }
};

// Update brand IsActive
export const brandIsActive = (id, isActive) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRAND_ISACTIVE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/brands/${id}`, { isActive }, config);

    dispatch({ type: BRAND_ISACTIVE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: BRAND_ISACTIVE_FAIL,
      payload: message,
    });
  }
};

// Delete brand
export const brandDeleteOne = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRAND_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/brands/${id}`, config);

    dispatch({ type: BRAND_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: BRAND_DELETE_FAIL,
      payload: message,
    });
  }
};

// Update brand
export const brandUpdateAll =
  (id, brandUpdatedInfo) => async (dispatch, getState) => {
    console.log(id);
    try {
      dispatch({ type: BRAND_EDIT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/brands/${id}`, brandUpdatedInfo, config);

      dispatch({ type: BRAND_EDIT_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }

      dispatch({
        type: BRAND_EDIT_FAIL,
        payload: message,
      });
    }
  };
