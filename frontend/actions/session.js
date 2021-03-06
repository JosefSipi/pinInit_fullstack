import { postUser, postSession, deleteSession } from "../utils/session";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_ERRORS_SIGNUP = "RECEIVE_ERRORS_SIGNUP";
export const RECEIVE_ERRORS_LOGIN = "RECEIVE_ERRORS_LOGIN";
// export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user,
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

// const receiveErrors = (errors) => ({
//     type: RECEIVE_ERRORS,
//     errors
// });

const receiveErrorsSignUp = (errors_sign_up) => ({
  type: RECEIVE_ERRORS_SIGNUP,
  errors_sign_up,
});

const receiveErrorsLogIn = (errors_log_in) => ({
  type: RECEIVE_ERRORS_LOGIN,
  errors_log_in,
});

export const createNewUser = (formUser) => (dispatch) => {
  return postUser(formUser).then(
    (user) => dispatch(receiveCurrentUser(user)),
    (err) => dispatch(receiveErrorsSignUp(err.responseJSON))
  );
};

export const login = (formUser) => (dispatch) =>
  postSession(formUser).then(
    (user) => dispatch(receiveCurrentUser(user)),
    (err) => dispatch(receiveErrorsLogIn(err.responseJSON))
  );

export const logout = () => (dispatch) =>
  deleteSession().then(() => dispatch(logoutCurrentUser()));
