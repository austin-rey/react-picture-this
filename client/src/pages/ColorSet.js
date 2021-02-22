import React,{useState, useEffect,useContext} from 'react'
import { Link,useParams } from 'react-router-dom'
import { useGetColorSet } from '../hooks/sets/useGetColorSet'
import { useDeleteSet } from '../hooks/sets/useDeleteSet'
import AuthContext from '../context/authContext';
import ColorRectangle from '../components/ColorRectangle'
import ColorRange from '../components/ColorRange'
import ColorHueToolbar from '../components/ColorHueToolbar'
import Loading from '../components/Loading'

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

    // Range states
    const [saturationRange, setSaturationRange] = useState({
        min: '50',
        max: '75'
    })

    const [lightnessRange, setLightnessRange] = useState({
        min: '50',
        max: '75'
    })

    const hueToolbarProps = {
        saturationRange, 
        setSaturationRange, 
        lightnessRange, 
        setLightnessRange,
    }

    // Verify user token is in cookies and apply redirect if necessary
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
                        {(data)? <>
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
                                <ColorHueToolbar {...hueToolbarProps} />
                                <div className="my-6 ">
                                    <div className="flex flex-row justify-between border-b mb-2">
                                        <div className="flex flex-row items-center">
                                            <h6 className="font-sans font-bold text-md pb-2">Red</h6>
                                            <span className="font-sans text-sm pb-2 text-gray-400 font-normal ml-3">{'  '}{data[0].colorRange.red.length} results (Showing at most 1000)</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-yellow-500 font-normal">&deg;0 - &deg;12 and &deg;349 - &deg;360 </span>
                                    </div>
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.red} />
                                </div>
                                <div className="my-6">
                                    <div className="flex flex-row justify-between border-b mb-2">
                                        <div className="flex flex-row items-center">
                                            <h6 className="font-sans font-bold text-md pb-2">Orange</h6>
                                            <span className="font-sans text-sm pb-2 text-gray-400 font-normal ml-3">{'  '}{data[0].colorRange.orange.length} results (Showing at most 1000)</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-yellow-500 font-normal">&deg;13 - &deg;36 </span>
                                    </div>
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.orange} />
                                </div>
                                <div className="my-6">
                                    <div className="flex flex-row justify-between border-b mb-2">
                                        <div className="flex flex-row items-center">
                                            <h6 className="font-sans font-bold text-md pb-2">Yellow</h6>
                                            <span className="font-sans text-sm pb-2 text-gray-400 font-normal ml-3">{'  '}{data[0].colorRange.yellow.length} results (Showing at most 1000)</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-yellow-500 font-normal">&deg;37 - &deg;66 </span>
                                    </div>
                                   
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.yellow} />
                                </div>
                                <div className="my-6">
                                    <div className="flex flex-row justify-between border-b mb-2">
                                        <div className="flex flex-row items-center">
                                            <h6 className="font-sans font-bold text-md pb-2">Green</h6>
                                            <span className="font-sans text-sm pb-2 text-gray-400 font-normal ml-3">{'  '}{data[0].colorRange.green.length} results (Showing at most 1000)</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-yellow-500 font-normal">&deg;67 - &deg;162 </span>
                                    </div>
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.green} />
                                </div>
                                <div className="my-6">
                                    <div className="flex flex-row justify-between border-b mb-2">
                                        <div className="flex flex-row items-center">
                                            <h6 className="font-sans font-bold text-md pb-2">Blue</h6>
                                            <span className="font-sans text-sm pb-2 text-gray-400 font-normal ml-3">{'  '}{data[0].colorRange.blue.length} results (Showing at most 1000)</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-yellow-500 font-normal"> &deg;163 - &deg;252 </span>
                                    </div>
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.blue} />
                                </div>
                                <div className="my-6">
                                    <div className="flex flex-row justify-between border-b mb-2">
                                        <div className="flex flex-row items-center">
                                            <h6 className="font-sans font-bold text-md pb-2">Magenta</h6>
                                            <span className="font-sans text-sm pb-2 text-gray-400 font-normal ml-3">{'  '}{data[0].colorRange.magenta.length} results (Showing at most 1000)</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-yellow-500 font-normal">&deg;253 - &deg;348 </span>
                                    </div>
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.magenta} />
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
