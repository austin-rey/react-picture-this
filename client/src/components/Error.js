import React from 'react'
import PropTypes from 'prop-types';

const Error = ({message}) => {
    return (
        <div className="flex flex-col w-full justify-center items-center p-1 my-2 rounded-md bg-red-500">
        <h3 className="flex font-sans text-xl text-white">{message}</h3>
    </div>
    )
}

Error.propTypes = {
    message: PropTypes.string
};

export default Error
