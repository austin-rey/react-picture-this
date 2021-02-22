import React from 'react'

const ColorHueToolbar = ({saturationRange,setSaturationRange,lightnessRange,setLightnessRange}) => {

    const saturationChange = (e) => {
        setSaturationRange({...saturationRange, [e.target.name]: e.target.value})
    }

    const lightnessChange = (e) => {
        setLightnessRange({...lightnessRange, [e.target.name]: e.target.value})
    }
       
    return (
            <div className="bg-gray-200 p-4">
                <div className="flex flex-row">
                    <div className="flex flex-col w-6/12 mr-4">
                        <h6 className="font-sans font-bold text-md pb-2 mb-2 border-b-2">Saturation</h6>
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                                <label htmlFor="min-sat">Min</label>
                                <input type="text" id="min-sat" name="min" placeholder="Enter a number..." value={saturationRange.min} onChange={saturationChange} className="w-16 p-2 rounded-md"/>
                            </div>
                            <p className="flex flex-col">to</p>
                            <div className="flex flex-col">
                                <label htmlFor="max-sat">Max</label>
                                <input type="text" id="max-sat" name="max" placeholder="Enter a number..." value={saturationRange.max} onChange={saturationChange} className="w-16 p-2 rounded-md"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-6/12 ml-4">
                        <h6 className="font-sans font-bold text-md pb-2 mb-2 border-b-2">Lightness</h6>
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                                <label htmlFor="min-light">Min</label>
                                <input type="text" id="min-light" name="min" placeholder="Enter a number..." value={lightnessRange.min} onChange={lightnessChange} className="w-16 p-2 rounded-md"/>
                            </div>
                            <p className="flex flex-col">to</p>
                            <div className="flex flex-col">
                                <label htmlFor="max-light">Max</label>
                                <input type="text" id="max-light" name="max" placeholder="Enter a number..." value={lightnessRange.max} onChange={lightnessChange} className="w-16 p-2 rounded-md"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ColorHueToolbar
