import React from 'react'

import PropTypes from 'prop-types'

const RegisterForm = ({onChange,formFields,onSubmit}) => {
    return (
        <form className="root flex flex-col align-items-stretch" onSubmit={onSubmit}>
            <div className="m-5">
                <p className="w-full py-2 text-left text-lg">Name</p>
                <input type="text" id="name-field" name="name" placeholder="Enter a valid name..." className="w-full p-2 rounded-md border-4 border-green-500 border-opacity-50 focus:border-opacity-100 outline-none" value={formFields.name} onChange={onChange}/>
            </div>
            <div className="m-5">
                <p className="w-full py-2 text-left text-lg">Email</p>
                <input type="text" id="email-field" name="email" placeholder="Enter a valid email..." className="w-full p-2 rounded-md border-4 border-green-500 border-opacity-50 focus:border-opacity-100 outline-none" value={formFields.email} onChange={onChange}/>
            </div>
            <div className="m-5">
                <p className="w-full py-2 text-left text-lg">Password</p>
                <input type="text" id="password-field" name="password" placeholder="Enter a valid password..." className="w-full p-2 rounded-md border-4 border-green-500 border-opacity-50 focus:border-opacity-100 outline-none" value={formFields.password} onChange={onChange}/>
            </div>
            <div className="m-5">
                <input type="submit" value="Submit" className="w-full p-2 bg-green-700 text-white rounded-md"/>
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
