import { _getUsers  } from '../utils/data';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const RECEIVE_USER = 'RECEIVE_USER';

export const loginSuccess = (user,users) => {
  return {
    type: LOGIN_SUCCESS,
    user,
    users
  };
};

export const loginError = () => {
    return {
      type: LOGIN_FAIL,
    };
  };

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const receiveUsers = (users) => ({
  type: RECEIVE_USER,
  users,
});

export const fetchUsers = () => {
  return (dispatch) => {
    return _getUsers().then((users) => {
      dispatch(receiveUsers(users));
    });
  };
};

export const login = (id, password) => {
  return (dispatch) => {
    return _getUsers().then((users) => {
      const user = users[id];
      if (user && user.password === password){
        dispatch(loginSuccess(user,users))
      }
      else{
        alert("Id or password not match")
        dispatch(loginError())
      }
    });
  };
};
