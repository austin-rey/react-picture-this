import React from 'react'
import { Link } from 'react-router-dom'

import {deleteSessionCookies} from '../util/session';

const Header = () => {
    return (
        <div className="root bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-wrap justify-between flex-row p-4">
                    <div className="flex flex-row">
                        <h6 className="text-white font-sans text-xl">Picture This</h6>
                    </div>
                    <div className="flex flex-row">
                        <p><Link to="/" className="p-2 text-white font-sans text-sm">Home</Link></p>
                        <p><Link to="/" className="p-2 text-white font-sans text-sm">About</Link></p>
                        <p><Link to="/login" className="p-2 text-white font-sans text-sm">Login</Link></p>
                        <p><Link to="/register" className="p-2 text-white font-sans text-sm">Register</Link></p>
                        <p><Link to="/" className="p-2 text-white font-sans text-sm">Logout</Link></p>
                    </div>
                </div>
             </div>
        </div>
       
    )
}

export default Header
