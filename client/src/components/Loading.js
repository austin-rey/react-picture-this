import React from 'react'
import Spinner from './Spinner'
const Loading = () => {
    return (
        <div className="flex w-full h-screen bg-gray-100 items-center justify-center animate-pulse rounded-md">
            <div className="p-16 bg-gray-200 rounded-md">
                <h1 className="font-Lato text-4xl text-center text-green-700">Loading</h1>
                <img src="/spinner.gif" alt=""/>
            </div>
        </div>                
    )
}

export default Loading
