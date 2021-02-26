import React from 'react'

import PropTypes from 'prop-types'

const LoginForm = ({onChange, formFields,onSubmit}) => {
    return (
        <form className="root flex flex-col" onSubmit={onSubmit}>
            <div className="m-5">
                <label for="email-field" className="leading-10 text-left text-xl w-full font-sans">Email</label>
                <input type="text" id="email-field" name="email" placeholder="Enter a valid email..." value={formFields.email} className="w-full p-2 rounded-md border-4 border-gray-500 border-opacity-20 focus:border-green-500 outline-none h-full hover:border-green-500" onChange={onChange}/>
            </div>
            <div className="m-5">
                <label for="password-field" className="w-full leading-10 text-left text-xl font-sans">Password</label>
                <input type="password" id="password-field" name="password" placeholder="Enter a valid password..." value={formFields.password} className="w-full p-2 rounded-md border-4 border-gray-500 border-opacity-20 focus:border-green-500 outline-none h-full hover:border-green-500" onChange={onChange}/>
            </div>
            <div className="m-5">
                <input type="submit" value="Submit" className="w-full p-4 bg-green-700 text-white font-bold rounded-md cursor-pointer hover:bg-green-900"/>
            </div>
        </form>
    )
}

LoginForm.propTypes = {
    onChange: PropTypes.func,
    formFields: PropTypes.object,
    onSubmit: PropTypes.func
}

export default LoginForm
