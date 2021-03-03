import React from 'react'
import PropTypes from 'prop-types'

const RegisterForm = ({onChange,formFields,onSubmit}) => {
    return (
        <form className="root flex flex-col" onSubmit={onSubmit}>
            <div className="m-5">
                <label for="name-field" className="w-full text-left leading-10 text-xl font-sans">Name</label>
                <input type="text" id="name-field" name="username" placeholder="Enter a valid name..." className="w-full p-2 rounded-md border-4 border-gray-500 border-opacity-20 focus:border-green-500 outline-none h-full hover:border-green-500" value={formFields.username} onChange={onChange}/>
            </div>
            <div className="m-5">
                <label for="email-field" className="w-full text-left leading-10 text-xl font-sans">Email</label>
                <input type="text" id="email-field" name="email" placeholder="Enter a valid email..." className="w-full p-2 rounded-md border-4 border-gray-500 border-opacity-20 focus:border-green-500 outline-none h-full hover:border-green-500" value={formFields.email} onChange={onChange}/>
            </div>
            <div className="m-5">
                <label for="password-field" className="w-full text-left leading-10 text-xl font-sans">Password</label>
                <input type="password" id="password-field" name="password" placeholder="Enter a valid password..." className="w-full p-2 rounded-md border-4 border-gray-500 border-opacity-20 focus:border-green-500 outline-none h-full hover:border-green-500" value={formFields.password} onChange={onChange}/>
            </div>
            <div className="m-5">
                <input type="submit" value="Submit" className="w-full p-4 bg-green-700 text-white rounded-md font-bold hover:bg-green-900 cursor-pointer"/>
            </div>
        </form>
    )
}

RegisterForm.propTypes = {
    onChange: PropTypes.func,
    formFields: PropTypes.object,
    onSubmit: PropTypes.func
}

export default RegisterForm
