import React, { useState } from 'react';
import * as Cookies from "js-cookie";
import AuthContext from './authContext';

const AuthState = (props) => {
    const [token, setToken] = useState(Cookies.get('token'))

    // Add Token
    const addToken = (token) => {
        Cookies.remove('token')
        Cookies.set('token', token)
        setToken(token)
    }

    // Delete Token
    const deleteToken = () => {
        Cookies.remove('token')
        setToken(undefined)
    }

    // Get Token
    const getToken = () => {
      console.log(token)
        return token
    }

    return (
        <AuthContext.Provider
          value={{
            token: token,
            addToken,
            deleteToken,
            getToken
          }}
        >
          {props.children}
        </AuthContext.Provider>
      );
}

export default AuthState