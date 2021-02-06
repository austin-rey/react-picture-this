import React, {useState} from 'react'
import {AiFillCopy} from "react-icons/ai"

const copyToClipboard = (e) => {
    document.execCommand('copy');
}
// const [show, setDisplay] = useState(false)
const ColorRectangle = ({hex}) => {
    return (
        <div className="group relative w-full h-full hover:shadow-md" style={{backgroundColor: hex}}>
            <div className="w-full h-full opacity-0 cursor-pointer group-hover:opacity-100" onClick={copyToClipboard}>
                <span className="text-white absolute top-0.5 right-0.5"><AiFillCopy/></span>
                <p className="font-sans text-sm text-black w-full h-full">{hex}</p>
            </div>
        </div>
    )
}

export default ColorRectangle
