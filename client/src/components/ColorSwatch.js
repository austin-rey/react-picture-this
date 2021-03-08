import React from 'react'
import {AiFillCopy} from "react-icons/ai"
import {invertColor} from '../util/color'
import PropTypes from 'prop-types';

const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(e.target.value) 
}

const ColorSwatch = (props) => {
    return (
        <div className={`${props.className} group outline-none relative w-full h-full`} style={{backgroundColor: props.hex}}>
            <input type="button" className={`${props.className} w-full h-full opacity-0 cursor-pointer outline-none group-hover:opacity-100 focus:shadow-none`} onClick={copyToClipboard} style={{backgroundColor: props.hex, color: invertColor(props.hex,true)}} value={props.hex}/>
            <span className="text-white absolute top-1/4 right-1/4 opacity-0 group-hover:opacity-100" style={{color: invertColor(props.hex,true)}}><AiFillCopy/></span>
        </div>
    )
}

ColorSwatch.propTypes = {
    props: PropTypes.objectOf({
        hex: PropTypes.string,
        className: PropTypes.string,
    })
};

export default ColorSwatch
