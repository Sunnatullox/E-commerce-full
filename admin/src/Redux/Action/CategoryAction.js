import axios from "axios";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_ISACTIVE_FAIL,
  CATEGORY_ISACTIVE_REQUEST,
  CATEGORY_ISACTIVE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
} from "../Constants/CategoryConstants";
import { logout } from "./userActions";

// Get all categorys
export const getCategorysList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/categorys/all`, config);

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: message,
    });
  }
};

// Single Category
export const categoryDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/categorys/${id}`, config);
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create category
export const categoryCreate = (products) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/categorys`, products, config);

    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};

// Update Category IsActive
export const categoryIsActive =
  (id, isActive) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_ISACTIVE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/categorys/${id}`, { isActive }, config);

      dispatch({ type: CATEGORY_ISACTIVE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }

      dispatch({
        type: CATEGORY_ISACTIVE_FAIL,
        payload: message,
      });
    }
  };

// Delete category
export const categoryDeleteOne = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/categorys/${id}`, config);

    dispatch({ type: CATEGORY_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};

// Update Category
export const categoryUpdateAll =
  (id, categoryUpdatedInfo) => async (dispatch, getState) => {
    console.log(id)
    try {
      dispatch({ type: CATEGORY_EDIT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/categorys/${id}`, categoryUpdatedInfo, config);

      dispatch({ type: CATEGORY_EDIT_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }

      dispatch({
        type: CATEGORY_EDIT_FAIL,
        payload: message,
      });
    }
  };
