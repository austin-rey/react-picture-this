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
        <div className="h-16 flex w-full">
            {colorArr &&
                colorArr.map((color,i) => (
                    (color[1] >= parseFloat(satMin)/100
                    && color[1] <= parseFloat(satMax)/100 
                    && color[2] >= parseFloat(lightMin)/100 
                    && color[2] <= parseFloat(lightMax)/100
                    )
                        ? <button key={i} className="group flex h-full w-1 relative cursor-pointer" style={{backgroundColor: chroma.hsl(color[0], color[1], color[2])}} value={chroma(color).hex()} onClick={copyToClipboard}>
                            <div className="group-hover:opacity-100 absolute -top-16 mb-2 left-0 opacity-0 shadow-lg p-4 border" style={{backgroundColor: chroma.hsl(color[0], color[1], color[2])}}>
                                <span className="group-hover:opacity-100 w-100 w-12" style={{color: invertColor(chroma(color).hex(),true)}}>{chroma(color).hex()}</span>
                            </div>
                          </button>
                        :<></>
                ))
            }
        </div>
    )
}

export default ColorRange
