import React,{useState, useEffect} from 'react'

import { BrowserRouter as Router,Link } from 'react-router-dom'

import { useRegisterUser } from '../hooks/useRegisterUser'
import { useLoginUser } from '../hooks/useLoginUser'

import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const Login = () => {

    const { 
        isLoading: isLoadingRU,
        data: dataRU,
        error: errorRU,
        execute: executeRU
    } = useRegisterUser();

    const [registerUser, setRegisterUser] = useState(
        {
            name: "",
            email: "",
            password: "",
        }
    )

    const updateRegisterForm = (e,value) => {
        setRegisterUser({...registerUser, [e.target.name]: e.target.value})
    } 

    const submitRegisterUser = (e) => {
        e.preventDefault();
        executeRU(registerUser)
    }

    const { 
        isLoading: isLoadingLU,
        data: dataLU,
        error: errorLU,
        execute: executeLU
    } = useLoginUser();

    const [loginUser, setLoginUser] = useState(
        {
            email: "",
            password: "",
        }
    )

    const updateLoginForm = (e,value) => {
        console.log('HI')
        setLoginUser({...loginUser, [e.target.name]: e.target.value})
    } 

    const submitLoginUser = (e) => {
        e.preventDefault();
        executeLU(loginUser)
    }
    
    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-col justify-center align-center text-center py-10 px-6">
                    <div className="m-6 p-20 bg-white shadow-lg rounded-md">
                        <h1 className="font-sans text-4xl p-4">Login</h1>
                        <LoginForm onChange={updateLoginForm} formFields={loginUser} onSubmit={submitLoginUser}/>
                    </div>
                    <p className="text-white text-lg">-or-</p>
                    <div className="m-6 p-20 bg-white shadow-lg rounded-md">
                        <h1 className="font-sans text-4xl p-4">Register</h1>
                        <RegisterForm onChange={updateRegisterForm} formFields={registerUser} onSubmit={submitRegisterUser} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
