import React,{useState, useEffect} from 'react'
import { BrowserRouter as Router,Link } from 'react-router-dom'
import { useRegisterUser } from '../hooks/auth/useRegisterUser'
import RegisterForm from '../components/RegisterForm'

const Register = ({history}) => {

    const { 
        isLoading,
        data,
        error,
        execute
    } = useRegisterUser();

    const [registerUser, setRegisterUser] = useState(
        {
            username: "",
            email: "",
            password: "",
        }
    )

    const updateRegisterForm = (e,value) => {
        setRegisterUser({...registerUser, [e.target.name]: e.target.value})
    } 

    const submitRegisterUser = (e) => {
        e.preventDefault();
        execute({registerUser,history})
    }
    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-col justify-center align-center text-center py-10 px-6">
                    <div className="m-6 p-10 bg-white shadow-lg rounded-md">
                        <h1 className="font-sans text-4xl p-4">Register</h1>
                        <RegisterForm onChange={updateRegisterForm} formFields={registerUser} onSubmit={submitRegisterUser} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Register
