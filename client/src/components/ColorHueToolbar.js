import React from 'react'

const ColorHueToolbar = ({saturationRange,setSaturationRange,lightnessRange,setLightnessRange}) => {

    const saturationChange = (e) => {
        setSaturationRange({...saturationRange, [e.target.name]: e.target.value})
    }

    const lightnessChange = (e) => {
        setLightnessRange({...lightnessRange, [e.target.name]: e.target.value})
    }
       
    return (
            <div className="py-4">
                <div className="flex flex-row">
                    <div className="flex flex-col w-6/12 mr-2 bg-gray-100 rounded-md">
                        <h6 className="font-sans font-bold text-lg py-2 pl-1 text-center">Saturation</h6>
                        <div className="flex flex-row justify-between items-center p-4">
                            <div className="flex flex-col flex-grow text-center">
                                <label htmlFor="min-sat" className="mb-2 text-center text-md w-full font-sans">Min <span className="font-bold">(0%)</span></label>
                                <input type="text" id="min-sat" name="min" placeholder="Enter a number..." value={saturationRange.min} onChange={saturationChange} className="w-full p-2 rounded-md text-center outline-none border-4 border-gray-500 border-opacity-20 focus:border-green-500"/>
                            </div>
                            <p className="flex flex-col px-8 pt-8">to</p>
                            <div className="flex flex-col flex-grow text-center">
                                <label htmlFor="max-sat" className="mb-2 text-center text-md w-full font-sans">Max <span className="font-bold">(100%)</span></label>
                                <input type="text" id="max-sat" name="max" placeholder="Enter a number..." value={saturationRange.max} onChange={saturationChange} className="w-full p-2 rounded-md text-center outline-none border-4 border-gray-500 border-opacity-20 focus:border-green-500"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-6/12 ml-2 bg-gray-100 rounded-md">
                        <h6 className="font-sans font-bold text-lg py-2 pl-1 text-center">Lightness</h6>
                        <div className="flex flex-row justify-between items-center bg-gray-100 p-4">
                            <div className="flex flex-col flex-grow text-center">
                                <label htmlFor="min-light" className="mb-2 text-center text-md w-full font-sans">Min <span className="font-bold">(0%)</span></label>
                                <input type="text" id="min-light" name="min" placeholder="Enter a number..." value={lightnessRange.min} onChange={lightnessChange} className="w-full p-2 rounded-md text-center outline-none border-4 border-gray-500 border-opacity-20 focus:border-green-500"/>
                            </div>
                            <p className="flex flex-col px-8 pt-8">to</p>
                            <div className="flex flex-col flex-grow text-center">
                                <label htmlFor="max-light" className="mb-2 text-center text-md w-full font-sans">Max <span className="font-bold">(100%)</span></label>
                                <input type="text" id="max-light" name="max" placeholder="Enter a number..." value={lightnessRange.max} onChange={lightnessChange} className="w-full p-2 rounded-md text-center outline-none border-4 border-gray-500 border-opacity-20 focus:border-green-500"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ColorHueToolbar
