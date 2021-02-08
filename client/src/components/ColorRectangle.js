import React, {useState} from 'react'
import {AiFillCopy} from "react-icons/ai"
import {invertColor} from '../util/color'

const copyToClipboard = (e, value) => {
    e.preventDefault();
    navigator.clipboard.writeText(e.target.value) 
}
// const [show, setDisplay] = useState(false)
const ColorRectangle = ({hex}) => {
    return (
        <div className="group relative w-full h-full hover:shadow-md" style={{backgroundColor: hex}}>
            <input type="button" className="w-full h-full opacity-0 cursor-pointer group-hover:opacity-100"  onClick={copyToClipboard} style={{backgroundColor: hex, color: invertColor(hex,true)}} value={hex}/>
            <span className="text-white absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100" style={{color: invertColor(hex,true)}}><AiFillCopy/></span>
        </div>
    )
}

export default ColorRectangle
