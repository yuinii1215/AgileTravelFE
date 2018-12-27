
import http from './api'
import store from '../store';
// import { Kinvey } from "kinvey-nativescript-sdk";
export default class BackendService {

    isLoggedIn(){
        return false
    }

    login(user) {
        // return http.fetchPost('/api/login', user);
    }

    logout() {
        
    }

    register(user) {
        
    }
}