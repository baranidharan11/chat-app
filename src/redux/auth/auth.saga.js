/**
 * @module Auth-Saga
 */

import {

  signInWithEmailAndPassword,

  signOut
} from "firebase/auth";
import { toast } from "react-toastify";
import { all, put, takeEvery } from "redux-saga/effects";
import { addUser, getUserByEmail } from "../../firebase/services";
import { auth } from "../../firebase/firebase";

export function* loginWorker(action) {
  try {
    const userCredential = yield signInWithEmailAndPassword(
      auth,
      action.payload.email,
      action.payload.password
    );

    const firebaseUser = userCredential.user;

    const user = yield getUserByEmail(action.payload.email);
    if (!user) {
      toast.error("User not found in database.");
      return;
    }

    yield put({
      type: "SET_LOGGED_USER",
      payload: {
        data: {
          name: user.name,
          email: user.email,
          accessToken: firebaseUser.accessToken
        }
      }
    });

    toast.success("Login Success 🎉");

  } catch (error) {
    console.log("Login error:", error);
    toast.error(error.message);
  }
}

function* registerWorker(action) {

  try {
    const user = yield getUserByEmail(action.payload.user.email);
    if (user) {
      toast.error("User already exists");
      return;
    } else {
      const user = yield addUser({
        name: action.payload.user.name,
        email: action.payload.user.email,
        password: action.payload.user.password
      });
      yield put({
        type: "SET_LOGGED_USER",
        payload: {
          data: {
            name: action.payload.user.name,
            email: action.payload.user.email,
            password: action.payload.user.password,
            accessToken: user.user.accessToken
          }
        }
      });

      toast.success("Login Success");
      return;
    }

  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}


function* logOutWorker() {
  try {
    if (
      process.env.REACT_APP_STAGING === "saga" &&
      process.env.REACT_APP_DATABASE === "firebase"
    ) {
      signOut(auth);
      yield put({
        type: "SET_LOGGED_USER",
        payload: {
          data: {}
        }
      });
      toast.success("Logout successful");
    } else {
      yield put({
        type: "SET_LOGGED_USER",
        payload: {
          data: {}
        }
      });
      toast.success("Logout successful");
    }
  } catch (error) {
    /**
     * Display error message using toast if an error occurs.
     */
    toast.error(error.message);
  }
}



export function* authWatcher() {
  yield all([
    takeEvery("LOGIN", loginWorker),
    takeEvery("REGISTER", registerWorker),
    takeEvery("LOGOUT", logOutWorker),

  ]);
}
