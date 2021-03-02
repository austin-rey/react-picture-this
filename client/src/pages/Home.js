import React,{useState, useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { useGetColorSets } from '../hooks/sets/useGetColorSets'
import { useUploadImage } from '../hooks/sets/useUploadImage'
import AuthContext from '../context/authContext';
import Modal from 'react-modal';
import ColorRectangle from '../components/ColorRectangle'
import SetsToolbar from '../components/SetsToolbar'
import {RiCloseCircleFill} from "react-icons/ri"
import ReactPaginate from 'react-paginate';
import Loading from '../components/Loading'
import Spinner from '../components/Spinner'
import Error from '../components/Error'

const Home = ({history}) => {
    const { 
        isLoading,
        data,
        error,
        execute
    } = useGetColorSets();

    // Handles Modal Form State ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const { 
        isLoading: isLoadingImage,
        data: dataImage,
        error: errorImage,
        execute: executeImage
    } = useUploadImage();

    const [uploadedImage, setUploadedImage] = useState({
        name: '',
        file: undefined
    })

    const nameChange = (e) => {
        setUploadedImage({...uploadedImage, name: e.target.value})
    }

    const imageSubmit = (e,value) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',uploadedImage.file);
        formData.append('name',uploadedImage.name);
        executeImage({formData,history})
    }

    const handleImageUpload = (e) => {
        setUploadedImage({...uploadedImage, file: e.target.files[0]})
    }

    // Session and Initial Loading ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const session = useContext(AuthContext);
    const {getToken,user}= session;

    useEffect(() => {
        const tokenExists = getToken();
        if(tokenExists != undefined){
            execute({
                paginationOptions,
                sortSelect,
                searchQuery});
        } else {
            history.push('/')
        }
    }, [])

    // Modal ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const modalStyles = {
        content : {
            top                   : '40%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
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

    // Set Toolbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [searchQuery, setSearchQuery] = useState('')
    const searchChange = (e) => {
        setSearchQuery(e.target.value)
        execute({
            paginationOptions,
            sort: sortSelect,
            searchQuery: e.target.value,
        })
    }

    const [sortSelect, setSortSelect] = useState('lowercaseName')
    const sortChange = (e) => {
        setSortSelect(e.target.value)
        execute({
            paginationOptions,
            searchQuery,
            sort: e.target.value
        })
    }

    // Pagination ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [paginationOptions, setPaginationOptions] = useState({
        limit: '10',
        page: '1'
    })

    const pageChange = (data) => {
        window.scroll(0,0);
        setPaginationOptions((prevOptions) => ({
            ...prevOptions,
            page: data.selected+1
        }));
        execute({
            paginationOptions,
            sort: sortSelect,
            searchQuery,
            page: data.selected+1
        })
    }

    return (
        <div className="root h-full bg-green-700">
            <div className="container w-full mx-auto pt-12 pb-12"> 
                <div className="flex flex-col justify-center align-center p-10 bg-white shadow-lg rounded-md">
                    <h1 className="text-center font-sans pb-6 m-6 md:text-left font-Lato text-4xl text-gray-700">Welcome Back, {user.name}</h1>
                    <SetsToolbar searchQuery={searchQuery} searchChange={searchChange} sortSelect={sortSelect} sortChange={sortChange} openModal={openModal}/>
                    <div className="flex flex-col justify-center align-center px-6">
                        {error && 
                            <Error message={error.message}/>
                        }
                        {(data) ? <>
                            {(data.data.length === 0) &&
                               <div className="flex flex-col w-full h-96 justify-center items-center p-4 my-2 border-4 border-gray-500 border-opacity-20 rounded-md">
                                   <h1 className="flex font-Lato text-gray-700 text-4xl">No sets...</h1><br/>
                                   <h4 className="flex font-sans text-lg">Start by clicking the "Create Set" button in the above toolbar.</h4>
                                </div>
                            }
                            <div className="flex flex-col px-4 pt-8 border-b-4 border-gray-500 border-opacity-20"></div>
                            {data.data.map((set,i) => (
                                    <div className="flex flex-col text-center align-center py-4 border-b-4 border-gray-200 md:flex-row md:text-left md:py-6" key={set._id}>
                                        <div className="w-full lg:w-72 h-48 bg-gray-100 rounded-md p-2">
                                            <img className="h-full m-auto mh-05 rounded-md" src={set.image} alt={set.name}/>
                                        </div>
                                        <div className="flex flex-col md:pl-4 content-between md:w-full lg:flex-grow">
                                            <div className="flex flex-row justify-between md:py-0 sm:py-2">
                                                <div>
                                                    <h2 className="font-BowlbyOne text-2xl pb-1">{set.name}</h2>
                                                    <h6 className="font-sans text-md text-gray-400">Created By: <span className="text-yellow-500">{set.user.name}</span></h6>
                                                </div>
                                                <div>
                                                    <div className="bg-green-700 rounded-md flex flex-grow items-center text-white cursor-pointer font-bold hover:bg-green-900">
                                                        <Link className="w-full h-full" to={`../set/${set._id}`}>
                                                            <p className="flex items-center w-full h-full p-4">View Set</p>
                                                        </Link>
                                                    </div>  
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:flex-row justify-start items-center flex-grow h-full">
                                                {set.pallette.map((color,i) => (
                                                    <div key={i} className="w-20 h-20 mr-8 transform hover:scale-125">
                                                        <ColorRectangle hex={Object.values(color).toString()} className="rounded-full shadow-lg"/>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                            ))}
                            <div className="flex flex-col align-center py-6 px-6 my-6 text-center bg-gray-100 rounded-md">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                initialPage={0}
                                pageCount={data.pagination.totalPages}
                                onPageChange={pageChange}
                                containerClassName={"pagination flex flex-row items-center justify-center font-bold"}
                                previousLinkClassName={"bg-green-700 text-white rounded-md p-5 m-2 hover:bg-green-900"}
                                nextLinkClassName={"bg-green-700 text-white rounded-md p-5 m-2 hover:bg-green-900"}
                                disabledClassName={"pagination__link--disabled opacity-50 cursor-not-allowed"}
                                activeClassName={"pagination__link--active text-white"}
                                pageLinkClassName={"bg-white text-green-700 rounded-md p-4 m-2 border-4 border-green-700 border-opacity-50 hover:border-opacity-100 outline-none"}
                                activeLinkClassName={" border-opacity-100"}
                            />

                        </div>
                        </>
                        :<Loading/>
                        }
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="EUpload Image Modal"
            >
                <div className="p-6">
                    <div className="flex flex-row justify-between items-start divide-black mb-2">
                        <h2 className="font-Lato text-gray-700 text-2xl pb-2">Create a New Set</h2>
                        <button className="p-1 text-white rounded-lg" onClick={closeModal}><RiCloseCircleFill className="text-gray-700 w-6 h-6"/></button>
                    </div>
                    {errorImage && 
                        <Error message={errorImage.message}/>
                    }
                    {isLoadingImage && <Spinner/>}
                    <form onSubmit={imageSubmit} encType="multipart/form-data" className="w-96">
                        <div className="mb-6">
                            <label htmlFor="name-field" className="w-full leading-10 text-left text-xl font-sans">Name</label>
                            <p className="font-sans text-xs pb-2 text-yellow-500"> Must be 6 - 64 characters</p>
                            <input type="text" id="name-field" name="name" placeholder="Enter a set name..." value={uploadedImage.name} className="w-full p-2 rounded-md border-4  border-gray-500 border-opacity-20 focus:border-green-500 outline-none" onChange={nameChange}/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="mage-upload-button" className="w-full leading-10 text-left text-xl font-sans">Image</label>
                            <p className="font-sans text-xs pb-2 text-yellow-500">JPEG/JPG - 100 KB Limit</p>
                            <input className="text-center flex mb-4 bg-gray-100 p-1 rounded-md w-full" type="file" id="image-upload-button" name="setImage" accept="image/png, image/jpeg" onChange={handleImageUpload}/>
                        </div>
                        <input disabled={(uploadedImage.file !== undefined && uploadedImage.name.length>=6 && uploadedImage.name.length<=64)?false:true} type="submit" value="Upload" className="font-bold w-full p-2 bg-green-700 text-white rounded-md cursor-pointer opacity-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-900"/>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Home
