import {authenticationService} from '../_services'
import {authenticationConstants} from '../_constants'
import { alertActions } from './alert.actions';
import { history } from '../_helpers'

export const authenticationActions = {
    login,
    logout
}


function login(req) {
    return dispatch => {
        dispatch(loginRequest())

       authenticationService.login(req)
            .then(res => { 
                    dispatch(loginSuccess({
                        user : res.data.user,
                    token : res.data.token
                }));
                    dispatch(alertActions.success('Login successful'));
                    history.push('/landing')
                
                })
            .catch(err=> {
                dispatch(loginFailure(err.response.data))
                dispatch(alertActions.error('Error while logging in'));

            })
            
           
    };
    
    function loginRequest() { return { type: authenticationConstants.LOGIN_REQUEST } }
    function loginSuccess(payload) { return { type: authenticationConstants.LOGIN_SUCCESS, payload } }
    function loginFailure(error) { return { type: authenticationConstants.LOGIN_FAILURE, error } }

}


function logout() {
    return dispatch => {
        dispatch(logoutAction())
        history.push('/login')
           
    };
    
    function logoutAction() { return { type: authenticationConstants.LOGOUT } }
   

}