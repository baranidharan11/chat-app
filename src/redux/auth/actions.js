/**
 * @module Authentication-Action
 */

import store from "../store";

/**
 * Action types for user authentication.
 * @readonly
 * @enum {string}
 */
export const actionTypes = {
  REGISTER: "REGISTER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT", // Added logout action type
};

/**
 * Dispatches an action to log in a user.
 * @param {Object} user - The user object containing the login information.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password of the user.
 */
export const logInUser = (user) => {
  console.log("action called");
  store.dispatch({
    type: actionTypes.LOGIN,
    payload: {
      ...user,
    },
  });
};

/**
 * Dispatches an action to register a user.
 * @param {Object} user - The user object containing the registration information.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password of the user.
 */
export const registerUser = (user) => {
  store.dispatch({
    type: actionTypes.REGISTER,
    payload: {
      user: { ...user },
    },
  });
};

/**
 * Dispatches an action to log out a user.
 */
export const logoutUser = () => {
  store.dispatch({
    type: actionTypes.LOGOUT,
  });
};
