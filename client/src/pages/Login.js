import React,{useState, useEffect,useContext} from 'react'
import { useLoginUser } from '../hooks/auth/useLoginUser'
import LoginForm from '../components/LoginForm'
import AuthContext from '../context/authContext';
import Error from '../components/Error'

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
        if(tokenExists !== undefined){
            history.push('/sets')
        }
    }, [data])
    
    return (
        <div className="root bg-green-700" style={{minHeight: 'calc(100vh - 115px)'}}>
            <div className="container h-full w-full md:w-2/3 lg:w-2/3 xl:w-1/3 mx-auto pt-12 pb-12"> 
                <div className="flex flex-col justify-center align-center p-10 bg-white shadow-lg rounded-md ">
                    {error && 
                        <Error message={error.message}/>
                    }
                    <h1 className="font-Lato text-5xl p-4 text-center text-gray-700">Login</h1>
                    <LoginForm onChange={updateLoginForm} formFields={loginUser} onSubmit={submitLoginUser}/>
                </div>
            </div>
        </div>
    )
}

export default Login
