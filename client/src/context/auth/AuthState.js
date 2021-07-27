import React, { useReducer } from 'react';
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from 'axios';
import setAuthToken from '../../utils.js/SetAuthToken';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT,CLEAR_ERRORS } from '../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null 
    }
    const [state,dispatch] = useReducer(AuthReducer, initialState);

    // Load User
    const loadUser = async () => {
        if(localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'))
        }
        try {
            const res = await axios.get('api/auth');
            dispatch({ type:USER_LOADED, payload:res.data })
        } catch (error) {
            dispatch({ type:AUTH_ERROR, payload:error.response.data.msg })
        }
    }

    //Register User
    const register = async formdata => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formdata, config);
            dispatch({ type:REGISTER_SUCCESS, payload:res.data})
            loadUser();
        } catch (error) {
            dispatch({ type:REGISTER_FAIL, payload:error.response.data.msg})
        }
    }

    //Login User
    const login = async (formdata) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formdata, config);
            dispatch({ type:LOGIN_SUCCESS, payload:res.data }); 
        } catch (error) {
            dispatch({ type:LOGIN_FAIL, payload:error.response.data.msg})
        }
        
    }

    //Logout
    const logout = () => {
        dispatch({ type:LOGOUT })
    }

    //Clear Errors
    const clearErrors = () => {
        dispatch({ type:CLEAR_ERRORS })
    }

    return (
        <AuthContext.Provider value = {{ token:state.token, isAuthenticated:state.isAuthenticated, user: state.user, loading:state.loading, error:state.error, register, loadUser, login, logout, clearErrors }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;


