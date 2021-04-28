import { AntLoginForm } from '../AntComponents/AntLoginForm'
import {authenticationActions} from '../../_actions'
import {connect} from 'react-redux'
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