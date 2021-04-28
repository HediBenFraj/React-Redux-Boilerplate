/**
 * Importing alertConstants to check the action type property
 */
import { alertConstants } from '../_constants';
/**
 * exporting an alert function that handles every action related to alerts
 * 
 * @param {object} state   this is the default state of the alerts object in redux store 
 * @param {object} action  this is the received action from the action creators 
 * @exports Reducers__Alerts
 * @returns a new redux store state
 * 
 */

 
export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}