import React,{useState, useEffect,useContext} from 'react'
import { Link,useParams } from 'react-router-dom'
import { useGetColorSet } from '../hooks/sets/useGetColorSet'
import { useDeleteSet } from '../hooks/sets/useDeleteSet'
import AuthContext from '../context/authContext';
import ColorRectangle from '../components/ColorRectangle'
import ColorRange from '../components/ColorRange'

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

    const session = useContext(AuthContext);
    const {getToken}= session;
    useEffect(() => {
        const tokenExists = getToken();
        if(tokenExists != undefined){
            execute(id);
        } else {
            history.push('/')
        }
    }, [])

 
    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-col justify-center align-center p-6">
                    <div className="m-6 p-10 bg-white shadow-lg rounded-md">
                        {data && <>
                            <Link className="underline text-green-500" to="/sets">Back</Link>
                            <div className="flex flex-row justify-between items-center flex-grow px-2 pt-4">
                                <div className="px-2 pt-2">
                                    <h1 className="font-sans text-4xl">{data[0].name}</h1>
                                    <h6 className="font-sans text-md pb-2 text-gray-400">Created by: {data[0].user.name}</h6>
                                </div>
                                <div className="flex flex-row px-2">
                                    <input type="button" value="Delete" className="w-full px-4 py-2 m-1 bg-red-600 text-white rounded-md cursor-pointer" onClick={deleteSet}/>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center align-center p-4">
                                <div className="w-full h-full bg-gray-100">
                                <img src={data[0].image} alt="Uploaded image for this data set" className="m-auto" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center align-center p-4">
                                <h2 className="font-sans text-2xl pb-1">Pallette</h2>
                                <h6 className="font-sans text-md pb-2 text-gray-400">Re-occurring colors found in your image.</h6>

                                <div className="flex flex-row justify-items-stretch my-6">
                                    {data[0].pallette.map((color,i) => (
                                        <div key={i} className="w-1/5 h-12">
                                            <ColorRectangle hex={Object.values(color).toString()}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col p-4">
                                <h2 className="font-sans text-2xl pb-1">Colors By Hue</h2>
                                <h6 className="font-sans text-md pb-2 text-gray-400">Color scales found in your image based off <a className="underline text-green-500" href="https://www.december.com/html/spec/colorhsltable.html" target="_blank">hue ranges</a>. Click a color to copy its hex value.</h6>
                                <div className="my-6">
                                    <h6 className="font-sans text-md pb-2">Red <span className="font-sans text-sm pb-2 text-gray-400">&deg;0 - &deg;29</span></h6>
                                    <ColorRange colorArr={data[0].colorRange.red} />
                                </div>
                                <div className="my-6">
                                    <h6 className="font-sans text-md pb-2">Orange <span className="font-sans text-sm pb-2 text-gray-400">&deg;30 - &deg;59</span></h6>
                                    <ColorRange colorArr={data[0].colorRange.orange} />
                                </div>
                                <div className="my-6">
                                    <h6 className="font-sans text-md pb-2">Yellow <span className="font-sans text-sm pb-2 text-gray-400">&deg;60 - &deg;89</span></h6>
                                    <ColorRange colorArr={data[0].colorRange.yellow} />
                                </div>
                                <div className="my-6">
                                    <h6 className="font-sans text-md pb-2">Green <span className="font-sans text-sm pb-2 text-gray-400">&deg;90 - &deg;179</span></h6>
                                    <ColorRange colorArr={data[0].colorRange.green} />
                                </div>
                                <div className="my-6">
                                    <h6 className="font-sans text-md pb-2">Blue <span className="font-sans text-sm pb-2 text-gray-400"> &deg;180 - &deg;269</span></h6>
                                    <ColorRange colorArr={data[0].colorRange.blue} />
                                </div>
                                <div className="my-6">
                                    <h6 className="font-sans text-md pb-2">Magenta <span className="font-sans text-sm pb-2 text-gray-400">&deg;270 - &deg;359</span></h6>
                                    <ColorRange colorArr={data[0].colorRange.magenta} />
                                </div>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorSet
