import axios from 'axios'
import {serverConstants} from '../_constants'

export const authenticationService = {
    login
}


function login(req){
    return axios.post(`${serverConstants.DOMAIN_URL}/api/auth`,req)
}