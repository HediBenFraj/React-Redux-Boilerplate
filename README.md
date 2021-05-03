# React-Redux Application Boilerplate

In this repository you will find an efficient, easily understandable React-redux boilerplate.

## Main purpose

The main purpose of this repository is to provide a robust, well organized folder/file structure for your application and to mninimize the app setup time to start coding as soon as possible.

Please note that i don't recommend such a structure for beginners or small projects although it would be great to get familiar with it as soon as possible.


## Requirements
    - Understanding of react workflow.
    - Understanding of Redux and react-redux key concepts.

## Getting Started:

### Cloning repository

    - Clone the repository on your machine using :  git clone https://github.com/HediBenFraj/React-Redux-Boilerplate.git
    - navigate to project directory and run : npm install
    - start the application by running : npm start
    - ( Optional ) : change the DOMAIN_URL constant in ./_constants/server.constants.js to an api with authentication metod to replicate my experience.

### Required dependencies 

    "antd": "^4.15.3",
    "axios": "^0.21.1",
    "redux": "^4.1.0",
    "react-redux": "^7.2.4",
    "redux-devtools-extension": "^2.13.9",
    "redux-logger": "^3.0.6",
    "redux-persist": "^6.0.0",
    "redux-thunk": "^2.3.0",
    "react-router-dom": "^5.2.0",

#### 1) antd : a ui component library for react. 

#### 2) axios : a js library for handeling http requests.

#### 3) redux, react-redux : a js library to handle state managment.

#### 4) redux-devtools-extension : a middleware that allows us to work developper tools extension in the browser.

#### 5) redux-logger : a middleware for logging our redux actions.

#### 6) redux-persist : a library that gives us the ability to easily save our redux store to local storage. 

#### 7) redux-thunk : a middleware that allows us to cerate action creators that return a function instead of an action 

This is helpfull and gives us more freedom creating with our actions

#### 8) react-router-dom : a js library that handles routing in our react application

### Folder/File structure 

    __src
     |
     |__ _actions
     |        |__ <module>.actions.js 
     |        |__ index.js
     |
     |__ _constants
     |        |__ <module>.constants.js
     |        |__ index.js
     |
     |__ _helpers
     |        |__ store.js
     |        |__ history.js
     |        |__ index.js
     |         
     |__ _reducers
     |        |__ <module>.reducer.js
     |        |__ index.js
     |
     |__ _services
     |        |
     |        |__ <module>.service.js
     |
     |__ Assets
     |
     |__ Components
     |        |__ <Component>
     |                 |_ <Component>.test.js 
     |                 |_ <Component>.css
     |                 |_ <component>.js
     |                 |_ index.js
     |__ index.js

### Understanding the Folder/File structure

    - ./<folder>/index.js

The index.js files in each folder are only used for ease of referencing modules while importing.

#### 1) _actions

    - ./src/_actions  

This folder will house our redux action creators.
    
    - ./src/actions/<module>.actions.js

This file will have the implementation of our actions creators.


#### Example of <module>.actions.js file :

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


#### 2) _constans

    - ./src/_constants  

This folder will house all our redux action types as constant for ease of use.
    
    - ./src/_constants/<module>.constants.js

This file will export an object with our action types.

#### Example of <module>.constants.js file :

    export const authenticationConstants ={
    LOGIN_REQUEST : "USER_LOGIN_REQUEST",
    LOGIN_SUCCESS : "USER_LOGIN_SUCCESS",
    LOGIN_FAILURE : "USER_LOGIN_FAILURE",

    LOGOUT : "USER_LOGOUT"
    }




#### 3) helpers

    - ./src/_helpers  

This folder will house our High Order Components.

##### store
    
    - ./src/_constants/store.js

    import { createStore,compose, applyMiddleware } from 'redux';
    import thunkMiddleware from 'redux-thunk';
    import { createLogger } from 'redux-logger';
    import rootReducer from '../_reducers';
    import { composeWithDevTools } from  'redux-devtools-extension'
    import storage from 'redux-persist/lib/storage';
    import { persistStore, persistReducer } from 'redux-persist';

    const loggerMiddleware = createLogger();

    const persistConfig = {
        key: 'root',
        storage: storage
      };
    
      const pReducer = persistReducer(persistConfig, rootReducer);
    
    const store = createStore(
        pReducer,
        compose(applyMiddleware(thunkMiddleware),applyMiddleware(loggerMiddleware),composeWithDevTools())
    );

    const persistor = persistStore(store);

    export  {store,persistor}


This file will contain our redux store creation.

the createStore() function from 'react-redux' takes two parameters:
1) the root reducer.
2) compose() which takes a list of middlewares to apply to our store.

    const store = createStore(
        pReducer,
        compose(applyMiddleware(thunkMiddleware),applyMiddleware(loggerMiddleware),composeWithDevTools())
    );

pReducer is our root reducer but with persistance applied to it 

    const pReducer = persistReducer(persistConfig, rootReducer);


I'm using multiple middlewares like 
1) redux-thunk middleware
2) redux-logger middleware
3) redux-devtools-extension middleware 

##### history component

    - ./src/_constants/store.js

    import { createBrowserHistory } from 'history';

    export const history = createBrowserHistory();

This file contains the creation of our history component which well help us with routing


##### 4) _reducers 

    - ./src/_reducers

This folder will contain our reducers grouped in modules

    - ./src/_reducers/<module>.reducer.js

This file exports an object with our action reducers as functions

#### Example of a <module>.reducer.js file :

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


##### 5) _services

    - ./src/_services

This folder will house all our api requests grouped in modules

    - ./src/_services/<module>.service.js

This folder will export an object with functions implementing our api calls 

##### Example of a <module>.service.js file :

    import axios from 'axios'
    import {serverConstants} from '../_constants'

    export const authenticationService = {
        login
    }


    function login(req){
        return axios.post(`${serverConstants.DOMAIN_URL}/api/auth`,req)
    }


Notice that we're importing axios to handle our http requests and that every function exports an axios function call which returns a promise.


##### 6) Assets 

    - ./src/Assets

This folder will cotains our assets : 
1) Images.
2) Icons.
3) Fonts.
...

#### 7) Components

    - ./src/Components

This folder will house our components represented by folders 

    - ./src/Components/<Component>

This folder will contain every file specific to a component 

Our styling:

    - ./src/Components/<Component>/<Component>.css

    .login-page{
    width: 100vw;
    height: 100vh;
    background: rgb(245,245,245);
    display: flex;
    justify-content: center;
    align-items: center;
    }

    .login-card{
        background: white;
        border-radius: 25px;
        width: 40vw;
        height: 40vh;
        padding: 2%;
        box-shadow: 3px 5px 5px rgba(0,0,0,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

our component implementation (jsx) :

    - ./src/Components/<Component>/<Component>.js

    import { AntLoginForm } from '../AntComponents/AntLoginForm'
    import {connect} from 'react-redux'
    import {authenticationActions} from '../../_actions'
    import './LoginPage.css'
    const LoginPage = ( props ) => {

        const handleLogin=(values) => {

            const req = {...values}
            props.login(req)

        }

        if(props.authentication.error){
            alert(props.authentication.error)
    }
    return (
        <div className="login-page">

                    <AntLoginForm onFinish={handleLogin}/>
            </div>
        )
    }
    const mapState=(state) =>{
    const {authentication} = state  

        return {
            authentication
        }
    }
    const actionCreators = {
    login : authenticationActions.login

    }

    const connectedLoginPage = connect(mapState,actionCreators)(LoginPage)
    export {connectedLoginPage as LoginPage}



# I hope that you found this reposiroty helpfull.

## [I invite you to visit NodeJs/Express jwt authentication app boilerplate](https://github.com/HediBenFraj/ExpressJs-JWT-Authentication-Authorization.git) :

