import React, { useState } from 'react';
import * as Cookies from "js-cookie";
import AuthContext from './authContext';

const AuthState = (props) => {
    const [token, setToken] = useState(Cookies.get('token'))
    const [user, setUser] = useState({
      name: Cookies.get('user-name'),
      email: Cookies.get('user-email')
    })

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
        return token
    }

    const userLogin = (user) => {
      console.log(user)
      Cookies.set('user-name', user.name)
      Cookies.set('user-email', user.email)
      setUser(user)
    }

    const logoutUser = () => {
      Cookies.remove('user-name')
      Cookies.remove('user-email')
    }

    return (
        <AuthContext.Provider
          value={{
            token: token,
            user: user,
            addToken,
            deleteToken,
            getToken,
            userLogin,
            logoutUser
          }}
        >
          {props.children}
        </AuthContext.Provider>
      );
}

export default AuthState