import React,{useEffect,useState} from 'react'
import chroma from 'chroma-js'
import {invertColor} from '../util/color'

const copyToClipboard = (e, value) => {
    e.preventDefault();
    navigator.clipboard.writeText(e.target.value) 
}

const ColorRange = ({colorArr, lightnessRange,saturationRange}) => {
    const {min: satMin, max: satMax} = saturationRange;
    const {min: lightMin, max: lightMax} = lightnessRange;

    useEffect(() => { 
    }, [saturationRange,lightnessRange])

    return (
        <div className="h-16 flex w-full bg-gray-100">
            {colorArr &&
                colorArr.map((color,i) => (
                    (chroma(color).hsl()[1] >= parseFloat(satMin)/100
                    && chroma(color).hsl()[1] <= parseFloat(satMax)/100 
                    && chroma(color).hsl()[2] >= parseFloat(lightMin)/100 
                    && chroma(color).hsl()[2] <= parseFloat(lightMax)/100
                    && i < 500
                    )
                        && <button key={color} className="group flex flex-grow h-full w-1 relative cursor-pointer" style={{backgroundColor: `${color}`}} value={chroma(color).hex()} onClick={copyToClipboard}>
                            <div className="group-hover:opacity-100 absolute -top-16 mb-2 left-0 opacity-0 shadow-lg p-4 border rounded-md" style={{backgroundColor: `${color}`}}>
                                <span className="group-hover:opacity-100 w-100 w-12 font-bold" style={{color: `${invertColor(chroma(color).hex(),true)}`}}>{chroma(color).hex()}</span>
                            </div>
                          </button>
                ))
            }
        </div>
    )
}

export default ColorRange
