import React from 'react'

import { BrowserRouter as Router,Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className="root h-screen">
            <div className="flex flex-col h-full justify-center align-center text-center pb-14">
                <h1 className="font-sans text-4xl p-4">Landing Page</h1>
                <p className="font-sans text-lg p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quis placeat provident mollitia, voluptatum porro optio velit eveniet doloremque architecto soluta perferendis nisi minima facilis vel asperiores doloribus! Autem, ut!</p>
                <div className="flex flex-row justify-center">
                    <div className="button font-sans p-4"><Link to="/register">Create Account</Link></div>
                    <div className="button font-sans p-4"><Link to="/login">Login</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Landing
