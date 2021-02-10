import React,{useState, useEffect,useContext} from 'react'
import { BrowserRouter as Router,Link } from 'react-router-dom'
import { useLoginUser } from '../hooks/auth/useLoginUser'
import LoginForm from '../components/LoginForm'
import AuthContext from '../context/authContext';

const Login = ({history}) => {
    const { 
        isLoading,
        data,
        error,
        execute
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
        execute({loginUser,history})
        console.log(data)
    }

    const session = useContext(AuthContext);
    const {getToken}= session;

    // Redirect if user is logged in
    useEffect(() => {
        const tokenExists = getToken();
        if(tokenExists != undefined){
            history.push('/sets')
        }
    }, [data])
    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-col justify-center align-left text-center py-10 px-6">
                    <div className="m-6 p-10 bg-white shadow-lg rounded-md">
                        <h1 className="font-sans text-4xl p-4 text-left">Login</h1>
                        <LoginForm onChange={updateLoginForm} formFields={loginUser} onSubmit={submitLoginUser}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
