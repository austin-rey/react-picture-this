import React,{useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Link } from 'react-router-dom'
import { useRegisterUser } from '../hooks/auth/useRegisterUser'
import RegisterForm from '../components/RegisterForm'
import AuthContext from '../context/authContext';
import Error from '../components/Error'

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

    const session = useContext(AuthContext);
    const {getToken}= session;
    useEffect(() => {
        const tokenExists = getToken();
        if(tokenExists != undefined){
            history.push('/sets')
        }
    }, [])

    return (
        <div className="root h-screen bg-green-700">
            <div className="container h-full w-full md:w-2/3 lg:w-2/3 xl:w-1/3 mx-auto pt-12 pb-12"> 
                <div className="flex flex-col justify-center align-center p-10 bg-white shadow-lg rounded-md">
                    {error && 
                        <Error message={error.message}/>
                    }
                    <h1 className="font-Lato text-5xl text-gray-700 p-4 text-center">Register</h1>
                    <RegisterForm onChange={updateRegisterForm} formFields={registerUser} onSubmit={submitRegisterUser} />
                </div>
            </div>
        </div>

    )
}

export default Register
