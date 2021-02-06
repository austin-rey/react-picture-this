import React,{useState, useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { useGetColorSets } from '../hooks/sets/useGetColorSets'
import { useUploadImage } from '../hooks/sets/useUploadImage'
import { SessionContext } from "../util/session";
import Modal from 'react-modal';

const Home = ({history}) => {
    const { 
        isLoading,
        data,
        error,
        execute
    } = useGetColorSets();

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

    const session = useContext(SessionContext);
    useEffect(() => {
        if(session === undefined) {
            history.push('/login')
        }else{
            execute({history});
        }
    }, [execute,session])
    
    const modalStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          width                 : '80vw',
          display               : 'flex',
          flexDirection         : 'column',
          maxWidth              : '900px',
          boxShadow             : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }
      };
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal(){
        setIsOpen(false);
    }
    console.log(data)
    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto pt-12 pb-12"> 
                <div className="flex flex-col justify-center align-center p-10 bg-white shadow-lg rounded-md">
                    <h1 className="font-sans text-3xl p-4">Welcome Back, User</h1>
                    <div className="flex flex-col justify-center align-center p-6">
                        {data &&
                            data.map((set,i) => (
                                <Link to={`../set/${set.slug}`} key={i}>
                                    <div className="flex flex-row align-center py-10 px-6 my-2 border-4 border-gray-500 border-opacity-20 rounded-md cursor-pointer">
                                        <div className="md:w-full lg:w-72 flex">
                                            <div className="w-full h-full bg-gray-200">
                                                {/* <img className="w-full h-auto" src="https://via.placeholder.com/300x250.png" alt={set.name}/> */}
                                            </div>
                                            
                                        </div>
                                        <div className="flex flex-col py-1 pl-4 content-between md:w-full lg:flex-grow">
                                            <div>
                                                <h2 className="font-sans text-2xl pb-2">{set.name}</h2>
                                                <h6 className="font-sans text-md pb-2 text-gray-400">Created By: {set.user.name}</h6>
                                            </div>
                                            <div className="flex flex-row justify-between items-start flex-grow h-full">
                                                {set.colors.map((color,i) => (
                                                    <span key={i} className="w-1/5 h-12" style={{backgroundColor: Object.keys(color)}}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                        <div className="flex flex-col align-center py-6 px-6 my-2 text-center border-4 border-gray-500 border-opacity-20 rounded-md">
                            <button onClick={openModal} className="bg-green-700 text-white rounded-md p-4 font-bold">Create New</button>
                        </div>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={modalStyles}
                            contentLabel="Example Modal"
                        >
                            <div className="flex flex-row justify-between items-start">
                            <h2 className="font-sans text-2xl pb-2">Create a New Set</h2>
                            <button onClick={closeModal}>close</button>
                            </div>
                            <form onSubmit={imageSubmit} encType="multipart/form-data" className="w-96">
                                <div className="mb-6">
                                    <p className="w-full py-2 text-left text-lg">Set Name</p>
                                    <input type="text" id="name-field" name="name" placeholder="Enter a set name..." value={uploadedImage.name} className="w-full p-2 rounded-md border-4 border-green-500 border-opacity-50 focus:border-opacity-100 outline-none" onChange={nameChange}/>
                                </div>
                                <div>
                                    <input className="mb-6 text-center flex mb-4" type="file" id="image-upload-button" name="setImage" accept="image/png, image/jpeg" onChange={handleImageUpload}/>
                                </div>
                                <input type="submit" value="Submit" className="w-full p-2 bg-green-700 text-white rounded-md cursor-pointer"/>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
