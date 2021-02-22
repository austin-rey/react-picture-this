import React from 'react'

const Loading = () => {
    return (
        <div className="flex w-full h-screen bg-gray-100 items-center justify-center animate-pulse ">
            <div className="p-16 bg-gray-200 rounded-md">
                <h1 className="font-sans text-4xl text-green-700">Loading...</h1>
            </div>
        </div>                
    )
}

export default Loading
