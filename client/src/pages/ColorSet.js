import React,{useState, useEffect,useContext} from 'react'
import { Link,useParams } from 'react-router-dom'
import { useGetColorSet } from '../hooks/sets/useGetColorSet'
import { useDeleteSet } from '../hooks/sets/useDeleteSet'
import AuthContext from '../context/authContext';
import ColorRectangle from '../components/ColorRectangle'
import ColorRange from '../components/ColorRange'
import ColorHueToolbar from '../components/ColorHueToolbar'
import Loading from '../components/Loading'
import Error from '../components/Error'

const ColorSet = ({history}) => {
    const { 
        isLoading,
        data,
        error,
        execute
    } = useGetColorSet();

    console.log(data)
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
        min: '20',
        max: '90'
    })

    const [lightnessRange, setLightnessRange] = useState({
        min: '20',
        max: '90'
    })

    const hueToolbarProps = {
        saturationRange, 
        setSaturationRange, 
        lightnessRange, 
        setLightnessRange,
    }

    // Verify user token is in cookies and apply redirect if necessary
    const session = useContext(AuthContext);
    const {getToken,user}= session;
    useEffect(() => {
        const tokenExists = getToken();
        if(tokenExists != undefined){
            execute(id);
            window.scroll(0,0);
        } else {
            history.push('/')
        }
    }, [])

    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-col justify-center align-center p-6">
                    <div className="m-6 p-10 bg-white shadow-lg rounded-md">
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
                                    <h1 className="font-sans text-4xl pb-1">{data[0].name}</h1>
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
                                <h2 className="font-sans text-2xl pb-1">Pallette</h2>
                                <h6 className="font-sans text-md text-gray-400 pb-2">Vibrant colors found in your image.</h6>
                                <div className="flex flex-row justify-items-stretch p-4 justify-evenly">
                                    {data[0].pallette.map((color,i) => (
                                        <div key={i} className="w-32 h-32 transform hover:scale-125">
                                            <ColorRectangle hex={Object.values(color).toString()} className="rounded-full shadow-lg"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col p-4">
                                <h2 className="font-sans text-2xl pb-1">Colors By Hue</h2>
                                <h6 className="font-sans text-md text-gray-400">Color scales found in your image based off <a className="underline text-green-500" href="https://www.december.com/html/spec/colorhsltable.html" target="_blank">hue ranges</a> corresponding to angular positions found on a <a className="underline text-green-500" href="https://en.wikipedia.org/wiki/Color_wheel" target="_blank">color wheel</a>. Narrow your results by adjusting the saturation and lightness ranges below. Each section shows the first 500 results.</h6>
                                <ColorHueToolbar {...hueToolbarProps} />
                                <div className="my-3">
                                    <div className="flex flex-row justify-between border-b-4 border-gray-500 border-opacity-20 mb-2">
                                        <div className="flex flex-row items-end">
                                            <h6 className="font-sans font-bold text-lg pb-1 flex ">Red</h6>
                                            <span className="font-sans text-sm pb-2 text-yellow-500 font-normal ml-3">{'  '}{data[0].colorRange.red.length} results</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-gray-400 font-normal flex items-end">&deg;0 - &deg;12 and &deg;349 - &deg;360 </span>
                                    </div>
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.red} />
                                </div>
                                <div className="my-3">
                                    <div className="flex flex-row justify-between border-b-4 border-gray-500 border-opacity-20 mb-2">
                                        <div className="flex flex-row items-end">
                                            <h6 className="font-sans font-bold text-lg pb-1 flex">Orange</h6>
                                            <span className="font-sans text-sm pb-2 text-yellow-500 font-normal ml-3">{'  '}{data[0].colorRange.orange.length} results</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-gray-400 font-normal flex items-end">&deg;13 - &deg;36 </span>
                                    </div>
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.orange} />
                                </div>
                                <div className="my-3">
                                    <div className="flex flex-row justify-between border-b-4 border-gray-500 border-opacity-20 mb-2">
                                        <div className="flex flex-row items-end">
                                            <h6 className="font-sans font-bold text-lg pb-1 flex">Yellow</h6>
                                            <span className="font-sans text-sm pb-2 text-yellow-500 font-normal ml-3">{'  '}{data[0].colorRange.yellow.length} results</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-gray-400 font-normal flex items-end">&deg;37 - &deg;66 </span>
                                    </div>
                                   
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.yellow} />
                                </div>
                                <div className="my-3">
                                    <div className="flex flex-row justify-between border-b-4 border-gray-500 border-opacity-20 mb-2">
                                        <div className="flex flex-row items-end">
                                            <h6 className="font-sans font-bold text-lg pb-1 flex">Green</h6>
                                            <span className="font-sans text-sm pb-2 text-yellow-500 font-normal ml-3">{'  '}{data[0].colorRange.green.length} results</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-gray-400 font-normal flex items-end">&deg;67 - &deg;162 </span>
                                    </div>
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.green} />
                                </div>
                                <div className="my-3">
                                    <div className="flex flex-row justify-between border-b-4 border-gray-500 border-opacity-20 mb-2">
                                        <div className="flex flex-row items-end">
                                            <h6 className="font-sans font-bold text-lg pb-1 flex">Blue</h6>
                                            <span className="font-sans text-sm pb-2 text-yellow-500 font-normal ml-3">{'  '}{data[0].colorRange.blue.length} results</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-gray-400 font-normal flex items-end"> &deg;163 - &deg;252 </span>
                                    </div>
                                    <ColorRange saturationRange={saturationRange} lightnessRange={lightnessRange} colorArr={data[0].colorRange.blue} />
                                </div>
                                <div className="my-3">
                                    <div className="flex flex-row justify-between border-b-4 border-gray-500 border-opacity-20 mb-2">
                                        <div className="flex flex-row items-end">
                                            <h6 className="font-sans font-bold text-lg pb-1 flex">Magenta</h6>
                                            <span className="font-sans text-sm pb-2 text-yellow-500 font-normal ml-3">{'  '}{data[0].colorRange.magenta.length} results</span>
                                        </div>
                                        <span className="font-sans text-sm pb-2 text-gray-400 font-normal flex items-end">&deg;253 - &deg;348 </span>
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
