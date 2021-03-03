import React from 'react'
import { BrowserRouter as Link } from 'react-router-dom'
import ColorRectangle from '../components/ColorRectangle'
import ColorRange from '../components/ColorRange'

const sampleColors = [
    '#f9ef08',
    '#043a94',
    '#dbdc5d',
    '#a7ac5d',
    '#3d6775',
    '#a7b8bf',
]

const range = {
    min: '0',
    max: '100'
}

const red =     ['#a86962','#8a3521','#9e432e','#2f1813','#2a1713','#914231','#160e0c','#994a39','#26130f','#923d29']
const orange =  ['#cb823d','#ba712c','#a85a29','#9e501f','#a85b23','#d48e38','#c27b23','#d89431','#c37c24','#de9548']
const yellow =  ['#eced4a','#e6db2b','#e9db23','#dbcd15','#f2e713','#e0e08a','#e7d511','#ece944','#ece944','#f2e524']
const green =   ['#678a48','#406843','#c9dc9a','#7fa471','#478256','#97ae7a','#91aa71','#93a569','#3d5f44','#a9ca57']
const blue =    ['#0955a9','#095c9e','#19458c','#1d4990','#3772ae','#265889','#084b92','#0f5299','#185582','#094da2']
const magenta = ['#543777','#755898','#d9bfca','#b07cad','#9c90c0','#a298bb','#b89dc8','#a99dc5','#a99dc5','#b3a7d7']

const Landing = () => {
    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto pt-12 pb-12"> 
                <div className="flex flex-col h-full justify-center align-center text-center p-6 bg-white shadow-lg rounded-md">
                    <div className="px-4 py-4 rounded-md mb-8">
                        <h1 className="font-Lato text-gray-700 text-5xl mt-8 mb-12">Picture This</h1>
                        <h3 className="font-Lato text-2xl font-bold text-green-700 mb-2 p-4 mx-8 mb-10">Discover color combinations by uploading an image that best captures your idea and/or end-product.</h3>
                        <p className="font-Mada text-xl text-gray-500 m-auto mb-8 border-b border-t w-4/5 py-4">For every image you uploaded, we create a set of colors that are parsed from your images data. Each set contains a pallette of vibrant colors and ranges of colors found between angular positions on a color wheel.</p>
                    </div>
                <div className="flex lg:flex-col xl:flex-row text-center mb-12">
                    <div className="lg:w-full xl:w-1/2 m-2 bg-gray-100 rounded-md">
                            <img src="/Sunflower.jpg" alt="" className="w-full rounded-md"/>
                    </div>
                    <div className="flex lg:w-full xl:w-1/2 flex-col bg-gray-100 rounded-md m-2">
                            <h2 className="font-Lato text-2xl font-bold text-gray-700 my-2 p-4 mx-8">Sunflower Color Set</h2>
                            <div className="flex flex-row justify-items-stretch p-4 justify-evenly bg-gray-100 mb-10">
                                {sampleColors.map((color,i) => (
                                    <div key={i} className="w-20 h-20 transform hover:scale-125">
                                        <ColorRectangle hex={color} className="rounded-full shadow-lg"/>
                                    </div>
                                ))}
                            </div>  
                            <div className="p-2 rounded-md mb-8">
                                <ColorRange saturationRange={range} lightnessRange={range} colorArr={red} />
                            </div>
                            <div className="p-2 rounded-md mb-8">
                                <ColorRange saturationRange={range} lightnessRange={range} colorArr={orange} />
                            </div>
                            <div className="p-2 rounded-md mb-8">
                                <ColorRange saturationRange={range} lightnessRange={range} colorArr={yellow} />
                            </div>
                            <div className="p-2 rounded-md mb-8">
                                <ColorRange saturationRange={range} lightnessRange={range} colorArr={green} />
                            </div>
                            <div className="p-2 rounded-md mb-8">
                                <ColorRange saturationRange={range} lightnessRange={range} colorArr={blue} />
                            </div>
                            <div className="p-2 rounded-md mb-8">
                                <ColorRange saturationRange={range} lightnessRange={range} colorArr={magenta} />
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
