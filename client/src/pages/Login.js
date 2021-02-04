import React,{useState, useEffect} from 'react'
import { BrowserRouter as Router,Link } from 'react-router-dom'
import { useLoginUser } from '../hooks/auth/useLoginUser'
import LoginForm from '../components/LoginForm'

const Login = () => {
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
                    <div className="m-6 p-10 bg-white shadow-lg rounded-md">
                        <h1 className="font-sans text-4xl p-4">Login</h1>
                        <LoginForm onChange={updateLoginForm} formFields={loginUser} onSubmit={submitLoginUser}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
