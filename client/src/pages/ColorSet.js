import React,{useState, useEffect,useContext} from 'react'

import { Link,useParams } from 'react-router-dom'

import { useGetColorSet } from '../hooks/sets/useGetColorSet'

import { SessionContext } from "../util/session";

const ColorSet = ({history}) => {
    const { 
        isLoading,
        data,
        error,
        execute
    } = useGetColorSet();

    let { id } = useParams();

    const session = useContext(SessionContext);

    useEffect(() => {
       if(session === undefined) {
            history.push('/login')
        }else{
            execute(id);
        }
    }, [execute,session])

    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-col justify-center align-center p-6">
                    <div className="m-6 p-10 bg-white shadow-lg rounded-md">
                        {data && <>
                            <Link to="/home/123">Back</Link>
                            <div className="flex flex-row justify-between items-center flex-grow px-2">
                                <h1 className="font-sans text-3xl p-4">{data[0].name}</h1>
                                <div className="flex flex-row">
                                    <input type="button" value="Delete" className="w-full px-4 py-2 m-1 bg-red-600 text-white rounded-md cursor-pointer"/>
                                    <input type="button" value="Save" className="w-full px-4 py-2 m-1 bg-green-700 text-white rounded-md cursor-pointer"/>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center align-center p-6">
                                <img src={data[0].image} alt="Uploaded image for this data set" className="mb-2 rounded-md" />
                                <div className="flex flex-row justify-items-stretch">
                                    {data[0].colors.map((color)=>(
                                        <div className="flex flex-col w-full mx-1">
                                            {Object.values(color).map((shades) => (
                                                shades.map((shade) => (
                                                    <span className="w-full h-20 rounded-md my-1 flex justify-center items-center" style={{backgroundColor: shade}}>
                                                    {console.log(shade)}
                                                    <p className="text-black">{shade}</p>
                                                    </span>
                                                ))
                                               
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
