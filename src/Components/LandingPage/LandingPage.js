import './LandingPage.css'
import { Button } from 'antd'
import { authenticationActions } from '../../_actions'
import { connect } from 'react-redux'

const LandingPage =(props) => {

    const logout=() => {
        props.logout()
    }
  
        return(
            <div className="landing-page">
                    <span>Welcome {props.authentication.user.fullName}!</span>
                    <Button type="primary" onClick={logout}>Log out</Button>
            </div>
        )
  

}

const mapState = ( state ) => {
    const {authentication} = state
    return{
        authentication
    }
}

const actionCreators = {
    logout : authenticationActions.logout
}

const connecttedLandingPage = connect(mapState,actionCreators)(LandingPage)

export {connecttedLandingPage as LandingPage}