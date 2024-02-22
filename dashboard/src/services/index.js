import axios from 'axios'
import AuthService from './auth'

const API_ENVS = {
    production: '',
    development: '',
    local: 'https://localhost:3000'
}

const httpClient = axios.create({
    baseURL: API_ENVS.locals
})

export default {
    auth: AuthService(httpClient)
}
