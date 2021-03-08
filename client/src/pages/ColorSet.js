import React,{useState, useEffect,useContext} from 'react'
import { Link,useParams } from 'react-router-dom'
import { useGetColorSet } from '../hooks/sets/useGetColorSet'
import { useDeleteSet } from '../hooks/sets/useDeleteSet'
import AuthContext from '../context/authContext';
import ColorSwatch from '../components/ColorSwatch'
import Loading from '../components/Loading'
import Error from '../components/Error'

const ColorSet = ({history}) => {
    const { 
        isLoading,
        data,
        error,
        execute
    } = useGetColorSet();

    const { 
        isLoading: isLoadingDelete,
        data: dataDelete,
        error: errorDelete,
        execute: executeDelete
    } = useDeleteSet();

    let { id } = useParams();

    const deleteSet = (e) => {
        executeDelete({id: data[0]._id, history})
    }

    // Verify user token is in cookies and apply redirect if necessary
    const session = useContext(AuthContext);
    const {getToken,user}= session;
    useEffect(() => {
        const tokenExists = getToken();
        if(tokenExists !== undefined){
            execute(id);
            window.scroll(0,0);
        } else {
            history.push('/')
        }
    }, [])

    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-col justify-center align-center pt-6">
                    <div className="mt-6 p-10 bg-white shadow-lg rounded-md">
                        {error && 
                            <Error message={error.message}/>
                        }
                         {errorDelete && 
                            <div className="flex flex-col w-full justify-center items-center p-1 my-2 rounded-md bg-red-500">
                                <h3 className="flex font-sans text-xl text-white">{errorDelete.message}</h3>
                            </div>
                        }
                        {(data)? <>
                            <Link className="underline text-green-500" to="/sets">Back</Link>
                            <div className="flex flex-row justify-between items-start flex-grow px-4 pt-8 pb-2">
                                <div>
                                    <h1 className=" font-Lato text-4xl text-gray-700 pb-1">{data[0].name}</h1>
                                    <h6 className="font-sans text-md text-gray-400">Created by: <span className="text-bold text-yellow-500">{data[0].user.name}</span></h6>
                                </div>
                                <div className="flex flex-row">
                                    {(user.name === data[0].user.name) && 
                                     <input type="button" value="Delete" className="w-full px-4 py-2 m-1 bg-red-600 text-white rounded-md cursor-pointer font-bold" onClick={deleteSet}/>
                                     }
                                </div>
                            </div>
                            <div className="flex flex-col justify-center align-center pb-4 pt-1 px-4">
                                <div className="w-full h-full bg-gray-100 py-4 rounded-md" >
                                    <img src={data[0].image} alt="Uploaded image for this data set" className="m-auto rounded-md" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center align-center p-4">
                                <h2 className="font-BowlbyOne text-3xl pb-1 md:text-left text-center text-gray-700">Pallette</h2>
                                <h6 className="font-sans text-md text-gray-400 pb-2 md:text-left text-center">Prominent colors found in your image.</h6>
                                <div className="flex flex-row justify-items-stretch p-4 justify-evenly">
                                    {data[0].pallette.map((color,i) => (
                                        <div key={i} className="w-16 h-16 mx-1 md:w-32 md:h-32 md:mx-0 transform hover:scale-125">
                                            <ColorSwatch hex={Object.values(color).toString()} className="rounded-full shadow-lg"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col p-0 md:p-4">
                                <h2 className="font-BowlbyOne text-3xl pb-1 md:text-left text-center text-gray-700">Color Ranges</h2>
                                <h6 className="font-sans text-md text-gray-400 md:text-left text-center">Color scales generated from the prominent colors found in your image.</h6>
                                <div className="flex flex-col md:flex-row mt-6">
                                    <div className="flex flex-col flex-grow w-full md:w-1/6 md:border-r-4 border-gray-500 border-opacity-20">
                                        <h6 className="font-sans font-bold text-lg py-2 border-b-4 border-gray-500 border-opacity-20 mb-2 text-center w-full text-gray-700">Vibrant</h6>
                                        <div className="flex md:flex-col pt-1 pb-4 md:pb-0 md:p-4 items-center w-full justify-evenly">
                                            {data[0].colorRange.Vibrant.slice(1, -1).map((color,i) => (
                                                <div key={i} className="w-8 h-8 md:w-16 md:h-16 mb-4 transform hover:scale-125">
                                                    <ColorSwatch hex={color} className="rounded-full shadow-lg"/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-grow w-full md:w-1/6 md:border-r-4 border-gray-500 border-opacity-20">
                                        <h6 className="font-sans font-bold text-lg py-2 border-b-4 border-gray-500 border-opacity-20 mb-2 text-center w-full text-gray-700">Dark Vibrant</h6>
                                        <div className="flex md:flex-col pt-1 pb-4 md:pb-0 md:p-4 items-center w-full justify-evenly">
                                            {data[0].colorRange.DarkVibrant.slice(1, -1).map((color,i) => (
                                                <div key={i} className="w-8 h-8 md:w-16 md:h-16 mb-4 transform hover:scale-125">
                                                    <ColorSwatch hex={color} className="rounded-full shadow-lg"/>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                    <div className="flex flex-col flex-grow w-full md:w-1/6 md:border-r-4 border-gray-500 border-opacity-20">
                                        <h6 className="font-sans font-bold text-lg py-2 border-b-4 border-gray-500 border-opacity-20 mb-2 text-center w-full text-gray-700">Light Vibrant</h6>
                                        <div className="flex md:flex-col pt-1 pb-4 md:pb-0 md:p-4 items-center w-full justify-evenly">
                                            {data[0].colorRange.LightVibrant.slice(1, -1).map((color,i) => (
                                                <div key={i} className="w-8 h-8 md:w-16 md:h-16 mb-4 transform hover:scale-125">
                                                    <ColorSwatch hex={color} className="rounded-full shadow-lg"/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-grow w-full md:w-1/6 md:border-r-4 border-gray-500 border-opacity-20">
                                        <h6 className="font-sans font-bold text-lg py-2 border-b-4 border-gray-500 border-opacity-20 mb-2 text-center w-full text-gray-700">Muted</h6>
                                        <div className="flex md:flex-col pt-1 pb-4 md:pb-0 md:p-4 items-center w-full justify-evenly">
                                            {data[0].colorRange.Muted.slice(1, -1).map((color,i) => (
                                                <div key={i} className="w-8 h-8 md:w-16 md:h-16 mb-4 transform hover:scale-125">
                                                    <ColorSwatch hex={color} className="rounded-full shadow-lg"/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-grow w-full md:w-1/6 md:border-r-4 border-gray-500 border-opacity-20">
                                        <h6 className="font-sans font-bold text-lg py-2 border-b-4 border-gray-500 border-opacity-20 mb-2 text-center w-full text-gray-700">Dark Muted</h6>
                                        <div className="flex md:flex-col pt-1 pb-4 md:pb-0 md:p-4 items-center w-full justify-evenly">
                                            {data[0].colorRange.DarkMuted.slice(1, -1).map((color,i) => (
                                                <div key={i} className="w-8 h-8 md:w-16 md:h-16 mb-4 transform hover:scale-125">
                                                    <ColorSwatch hex={color} className="rounded-full shadow-lg"/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-grow w-full md:w-1/6">
                                        <h6 className="font-sans font-bold text-lg py-2 border-b-4 border-gray-500 border-opacity-20 mb-2 text-center w-full text-gray-700">Light Muted</h6>
                                        <div className="flex md:flex-col pt-1 pb-4 md:pb-0 md:p-4 items-center w-full justify-evenly">
                                            {data[0].colorRange.LightMuted.slice(1, -1).map((color,i) => (
                                                <div key={i} className="w-8 h-8 md:w-16 md:h-16 mb-4 transform hover:scale-125">
                                                    <ColorSwatch hex={color} className="rounded-full shadow-lg"/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                        :<Loading/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorSet
