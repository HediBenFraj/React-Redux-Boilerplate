


import { authenticationConstants } from '../_constants'

const initialState= {loggedIn : false, loggingIn: false, user : {}, token : null,error : null}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_REQUEST:
       return {...state,
        loggingIn : true,
        error : null
    }
    case authenticationConstants.LOGIN_SUCCESS:
        
       return {...state,
        loggingIn: false,
        loggedIn : true,
        user : action.payload.user,
        token : action.payload.token,
        error: null
      
    }
    case authenticationConstants.LOGIN_FAILURE : 
        return {
            ...initialState,
            loggingIn :false,
            error : action.error
        }
    case authenticationConstants.LOGOUT : 
    return {
      ...initialState
    }     
    default:
      return state
  }
}