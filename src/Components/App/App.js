import './App.css'
import 'antd/dist/antd.css'; 
import {Route,Router,Redirect} from 'react-router-dom'
import {history } from '../../_helpers'
import {LoginPage} from '../LoginPage'
import { LandingPage } from '../LandingPage';



const App = () => {
    return(<Router history={history}>
        <Route path="/login" component={LoginPage} />
        <Route path="/landing" component={LandingPage}/>
        <Redirect from='/' to ='/login'/>
    </Router>)
}

export {App}