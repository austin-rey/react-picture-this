import React from 'react'
import { BrowserRouter as Router,Link } from 'react-router-dom'
import {CgArrowRightR} from "react-icons/cg";
import ColorRectangle from '../components/ColorRectangle'

const sampleColors = [
    '#ce3b36',
    '#796622',
    '#f9d698',
    '#70809d',
    '#47362d',
    '#ccbfb0',
]

const greyScale = [
    '#DEE2E6',
    '#CED4DA',
    '#ADB5BD',
    '#6C757D',
    '#495057',
    '#343A40'
]
const Landing = () => {
    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto pt-12 pb-12"> 
      
            <div className="flex flex-col h-full justify-center align-center text-center p-10 bg-white shadow-lg rounded-md">
                <h1 className="font-sans text-5xl p-8 mb-8">Picture This</h1>
                <p className="font-sans text-lg p-2 font-bold">Discover color combinations by uploading an image that best captures your idea and/or end-product.</p>
                <p className="font-sans text-lg p-2">For every image uploaded, we create a set of colors that you can utilize in the designs for your digital projects.</p>
                <p className="font-sans text-lg p-2">Built for developers and designers.</p>

                <div className="flex flex-row w-4/5 justify-self-center items-center m-auto p-4">
                    <div className="flex flex-col justify-end items-end bg-white rounded-md w-5/12">
                        <img src="/images/landingImage.jpg" alt="" className="w-min rounded-md"/>
                    </div>
                    <div className="flex justify-center items-center rounded-md mx-4 w-2/12">
                        <CgArrowRightR className="w-full h-16 text-gray-400" />
                    </div>
                    <div className="flex flex-col justify-center align-center bg-white rounded-md w-5/12 h-full py-32">
                        <div className="flex flex-col items-start flex-grow h-full w-full">
                            <div className="flex flex-row w-full">
                                {sampleColors.map((color,i) => (
                                    <div key={i} className="w-full md:w-1/6 h-12">
                                        <ColorRectangle hex={color}/>
                                    </div>
                                ))}
                            </div>
                            <div className=" flex flex-row p-4 w-full">
                                <h6 className="font-sans font-bold text-md pr-2 w-1/5">Red</h6>
                                <div className="flex flex-row w-4/5">
                                {greyScale.map((color,i) => (
                                    <div key={i} className="w-1/6 h-6">
                                        <ColorRectangle hex={color}/>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className=" flex flex-row p-4 w-full">
                                <h6 className="font-sans font-bold text-md pr-2 w-1/5">Orange</h6>
                                <div className="flex flex-row w-4/5 ">
                                {greyScale.map((color,i) => (
                                    <div key={i} className="w-1/6 h-6">
                                        <ColorRectangle hex={color}/>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className=" flex flex-row p-4 w-full">
                                <h6 className="font-sans font-bold text-md pr-2 w-1/5">Yellow</h6>
                                <div className="flex flex-row w-4/5 ">
                                {greyScale.map((color,i) => (
                                    <div key={i} className="w-1/6 h-6">
                                        <ColorRectangle hex={color}/>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className=" flex flex-row p-4 w-full">
                                <h6 className="font-sans font-bold text-md pr-2 w-1/5">Green</h6>
                                <div className="flex flex-row w-4/5 ">
                                {greyScale.map((color,i) => (
                                    <div key={i} className="w-1/6 h-6">
                                        <ColorRectangle hex={color}/>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className="flex flex-row p-4 w-full">
                                <h6 className="font-sans font-bold text-md pr-2 w-1/5">Blue</h6>
                                <div className="flex flex-row w-4/5 ">
                                {greyScale.map((color,i) => (
                                    <div key={i} className="w-1/6 h-6">
                                        <ColorRectangle hex={color}/>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className=" flex flex-row p-4 w-full">
                                <h6 className="font-sans font-bold text-md pr-2 w-1/5">Magenta</h6>
                                <div className="flex flex-row w-4/5 ">
                                {greyScale.map((color,i) => (
                                    <div key={i} className="w-1/6 h-6">
                                        <ColorRectangle hex={color}/>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center w-full">
                    <div className="button font-sans p-4 w-64 bg-green-700 rounded-md text-white font-bold  cursor-pointer m-2 border-4 border-green-700"><Link to="/register">Create Account</Link></div>
                    <div className="button font-sans p-4 w-64 bg-white rounded-md text-green-700 font-bold border-4 border-green-700 border-opacity-50 cursor-pointer m-2"><Link to="/login">Login</Link></div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Landing
