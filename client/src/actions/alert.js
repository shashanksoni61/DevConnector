import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

const ALERT_TIMEOUT = 3000;

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid();
  // console.log('alert action dispatched');
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(
    () => dispatch({ type: REMOVE_ALERT, payload: id }),
    ALERT_TIMEOUT
  );
};
