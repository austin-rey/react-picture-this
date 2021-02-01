import React,{useState, useEffect} from 'react'

import { BrowserRouter as Router,Link } from 'react-router-dom'

import { useGetColorSets } from '../hooks/useGetColorSets'

const Home = () => {
    const { 
        isLoading,
        data,
        error,
        execute
    } = useGetColorSets();

    console.log(data)

    useEffect(() => {
        try {
            execute(123);
        } catch (error) {
           console.log(error) 
        }
    }, [execute])

    const uploadImage = (e,value) => {
        e.preventDefault();
        console.log(e.target)
    }

    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-col justify-center align-center p-6">
                    <div className="m-6 p-10 bg-white shadow-lg rounded-md">
                        <h1 className="font-sans text-3xl p-4">Welcome Back, User</h1>
                        <div className="flex flex-col justify-center align-center p-6">
                            {data &&
                                data.map((set) => (
                                    <div className="flex flex-row align-center py-10 px-6 my-2  border-4 border-gray-500 border-opacity-20 rounded-md cursor-pointer">
                                        <div>
                                            <img className="w-full" src={set.imagePreview} alt=""/>
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-row justify-between items-start flex-grow px-2">
                                                <h2 className="font-sans text-2xl">{set.name}</h2>
                                                <p>{set.created}</p>
                                            </div>
                                            <div className="flex flex-row justify-between items-start flex-grow px-2 h-full">
                                                {set.colors.map((color) => (
                                                    <span className="w-1/5 h-full" style={{backgroundColor: color}}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                             <div className="flex flex-col align-center py-10 px-6 my-2 text-center border-4 border-gray-500 border-opacity-20 rounded-md cursor-pointer" onClick={()=>console.log('click')}>
                                <h2 className="font-sans text-2xl">Create New Set</h2>
                                <div className="p-4 m-2 bg-gray-200 rounded-md ">
                                    <form onSubmit={uploadImage}>
                                        <input className="text-center flex mb-4" type="file" id="image-upload-button" name="image upload button" accept="image/png, image/jpeg"/>
                                        <input type="submit" value="Submit" className="w-full p-2 bg-green-700 text-white rounded-md"/>
                                    </form>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
