import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import AuthContext from "../context/authContext";
import {MdFilterFrames} from "react-icons/md"

const Header = ({history}) => {

    const session = useContext(AuthContext);
    const {deleteToken,token,logoutUser}= session;
    
    const logout = () => {
        deleteToken()
        logoutUser()
        history.push('/')
    }

    return (
        <div className="root bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-wrap justify-between flex-row p-4">
                    <div className="flex flex-row">
                        <MdFilterFrames className="text-white text-xl m-1"/>
                        <h6 className="text-white font-Mada text-xl ml-1">Picture This</h6>
                    </div>
                    <div className="flex flex-row">
                        <p><Link to="/" className="p-2 text-white font-sans font-bold text-sm">Home</Link></p>
                        {(!token)
                        ?(<>
                            <p><Link to="/login" className="p-2 text-white font-sans font-bold text-sm">Login</Link></p>
                            <p><Link to="/register" className="p-2 text-white font-sans font-bold text-sm">Register</Link></p>
                        </>)
                        :<>
                            <p><Link to="/sets" className="p-2 text-white font-sans font-bold text-sm">Sets</Link></p>
                            <p onClick={logout}><Link className="p-2 text-white font-sans font-bold text-sm">Logout</Link></p>
                        </>
                        }
                    </div>
                </div>
             </div>
        </div>
       
    )
}

export default withRouter(Header)
