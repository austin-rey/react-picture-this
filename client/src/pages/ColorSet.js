import React,{useState, useEffect} from 'react'

import { BrowserRouter as Router,Link } from 'react-router-dom'

import { useGetColorSet } from '../hooks/sets/useGetColorSet'

const ColorSet = () => {
    const { 
        isLoading,
        data,
        error,
        execute
    } = useGetColorSet();

    useEffect(() => {
        try {
            execute(123);
        } catch (error) {
           console.log(error) 
        }
    }, [execute])

    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-col justify-center align-center p-6">
                    <div className="m-6 p-10 bg-white shadow-lg rounded-md">
                        {data && <>
                            <Link to="/home/123">Back</Link>
                            <div className="flex flex-row justify-between items-center flex-grow px-2">
                                <h1 className="font-sans text-3xl p-4">{data.name}</h1>
                                <div className="flex flex-row">
                                    <input type="button" value="Delete" className="w-full px-4 py-2 m-1 bg-red-600 text-white rounded-md cursor-pointer"/>
                                    <input type="button" value="Save" className="w-full px-4 py-2 m-1 bg-green-700 text-white rounded-md cursor-pointer"/>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center align-center p-6">
                                <img src={data.image} alt="Uploaded image for this data set" className="mb-2 rounded-md" />
                                <div className="flex flex-row justify-items-stretch">
                                    {data.colors.map((color)=>(
                                        <div className="flex flex-col w-full mx-1">
                                            {color.map((shade) => (
                                                <span className="w-full h-20 rounded-md my-1 flex justify-center items-center" style={{backgroundColor: shade}}>
                                                    <p className="text-black">{shade}</p>
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                        }
                        <div className="flex flex-row">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorSet
