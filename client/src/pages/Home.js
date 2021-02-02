import React,{useState, useEffect} from 'react'

import { BrowserRouter as Router,Link } from 'react-router-dom'

import { useGetColorSets } from '../hooks/useGetColorSets'
import { useUploadImage } from '../hooks/useUploadImage'

const Home = () => {
    const { 
        isLoading,
        data,
        error,
        execute
    } = useGetColorSets();

    useEffect(() => {
        try {
            execute(123);
        } catch (error) {
           console.log(error) 
        }
    }, [execute])


    const { 
        isLoading: isLoadingImage,
        data: dataImage,
        error: errorImage,
        execute: executeImage
    } = useUploadImage();

    const [uploadedImage, setUploadedImage] = useState({
        name: "",
        file: ""
    })

    const nameChange = (e) => {
        setUploadedImage({...uploadedImage, name: e.target.value})
    }

    const imageSubmit = (e,value) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',uploadedImage.file);
        formData.append('name',uploadedImage.name);
        executeImage(formData)
    }

    const handleImageUpload = (e) => {
        setUploadedImage({...uploadedImage, file: e.target.files[0]})
    }
    
    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto">
                <div className="flex flex-col justify-center align-center p-6">
                    <div className="m-6 p-10 bg-white shadow-lg rounded-md">
                        <h1 className="font-sans text-3xl p-4">Welcome Back, User</h1>
                        <div className="flex flex-col justify-center align-center p-6">
                            {data &&
                                data.map((set) => (
                                    <div className="flex flex-row align-center py-10 px-6 my-2  border-4 border-gray-500 border-opacity-20 rounded-md cursor-pointer">
                                        <div>
                                            <img className="w-full" src={set.imagePreview} alt=""/>
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-row justify-between items-start flex-grow px-2">
                                                <h2 className="font-sans text-2xl">{set.name}</h2>
                                                <p>{set.created}</p>
                                            </div>
                                            <div className="flex flex-row justify-between items-start flex-grow px-2 h-full">
                                                {set.colors.map((color) => (
                                                    <span className="w-1/5 h-full" style={{backgroundColor: color}}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                             <div className="flex flex-col align-center py-10 px-6 my-2 text-center border-4 border-gray-500 border-opacity-20 rounded-md">
                                <h2 className="font-sans text-2xl">Create New Set</h2>
                                <div className="p-4 m-2 bg-gray-200 rounded-md ">
                                    <form onSubmit={imageSubmit} encType="multipart/form-data" >
                                        <input type="text" id="name-field" name="name" placeholder="Enter a set name..." value={uploadedImage.name} className="w-full p-2 rounded-md border-4 border-green-500 border-opacity-50 focus:border-opacity-100 outline-none" onChange={nameChange}/>
                                        <input className="text-center flex mb-4" type="file" id="image-upload-button" name="setImage" accept="image/png, image/jpeg" onChange={handleImageUpload}/>
                                        <input type="submit" value="Submit" className="w-full p-2 bg-green-700 text-white rounded-md cursor-pointer"/>
                                    </form>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
