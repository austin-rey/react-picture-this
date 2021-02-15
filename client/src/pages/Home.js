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
        name: undefined,
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
    const {getToken}= session;

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

    const [sortSelect, setSortSelect] = useState('SetName')
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
        console.log(data)
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
                    <h1 className="font-sans text-3xl pt-6 pb-10 px-6">Welcome Back, User</h1>
                    <SetsToolbar searchQuery={searchQuery} searchChange={searchChange} sortSelect={sortSelect} sortChange={sortChange} openModal={openModal}/>
                    <div className="flex flex-col justify-center align-center p-6">
                        {(data) && <>
                            {data.data.map((set,i) => (
                                <Link to={`../set/${set.slug}`} key={i}>
                                    <div className="flex flex-row align-center py-10 px-6 my-2 border-4 border-gray-500 border-opacity-20 rounded-md cursor-pointer hover:border-green-500">
                                        <div className="md:w-full lg:w-72 flex">
                                            <div className="w-full h-36 bg-gray-100">
                                                <img className="h-full m-auto mh-05" src={set.image} alt={set.name}/>
                                            </div>
                                            
                                        </div>
                                        <div className="flex flex-col py-1 pl-4 content-between md:w-full lg:flex-grow">
                                            <div>
                                                <h2 className="font-sans text-2xl pb-2">{set.name}</h2>
                                                <h6 className="font-sans text-md pb-2 text-gray-400">Created By: {set.user.name}</h6>
                                            </div>
                                            <div className="flex flex-row justify-between items-start flex-grow h-full">
                                                {set.pallette.map((color,i) => (
                                                    <div key={i} className="w-1/5 h-12">
                                                        <ColorRectangle hex={Object.values(color).toString()}/>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            <div className="flex flex-col align-center py-6 px-6 my-2 text-center bg-gray-100 rounded-md">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                initialPage={0}
                                pageCount={data.pagination.totalPages}
                                onPageChange={pageChange}
                                containerClassName={"pagination flex flex-row items-center justify-center font-bold"}
                                previousLinkClassName={"bg-green-700 text-white rounded-md p-5 m-2"}
                                nextLinkClassName={"bg-green-700 text-white rounded-md p-5 m-2"}
                                disabledClassName={"pagination__link--disabled opacity-50 cursor-not-allowed"}
                                activeClassName={"pagination__link--active text-white"}
                                pageLinkClassName={"bg-white text-green-700 rounded-md p-4 m-2 border-4 border-green-700 border-opacity-50 hover:border-opacity-100"}
                                activeLinkClassName={""}
                            />

                        </div>
                        </>
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
                        <h2 className="font-sans text-2xl pb-2">Create a New Set</h2>
                        <button className="p-1 text-white rounded-lg" onClick={closeModal}><RiCloseCircleFill className="text-gray-700 w-6 h-6"/></button>
                    </div>
                    <form onSubmit={imageSubmit} encType="multipart/form-data" className="w-96">
                        <div className="mb-6">
                            <p className="w-full py-2 text-left text-lg">Name</p>
                            <p className="font-sans text-xs pb-2 text-yellow-500"> Must be 6 - 64 characters</p>
                            <input type="text" id="name-field" name="name" placeholder="Enter a set name..." value={uploadedImage.name} className="w-full p-2 rounded-md border-4  border-gray-500 border-opacity-20 focus:border-green-500 outline-none" onChange={nameChange}/>
                        </div>
                        <div className="mb-6">
                            <p className="w-full py-2 text-left text-lg">Image</p>
                            <p className="font-sans text-xs pb-2 text-yellow-500">JPEG/PNG - 3 MB Limit</p>
                            <input className="text-center flex mb-4 bg-gray-100 p-1 rounded-md w-full" type="file" id="image-upload-button" name="setImage" accept="image/png, image/jpeg" onChange={handleImageUpload}/>
                        </div>
                        <input disabled={(uploadedImage.file !== undefined && uploadedImage.name.length>=6 && uploadedImage.name.length<=64)?false:true} type="submit" value="Upload" className="font-bold w-full p-2 bg-green-700 text-white rounded-md cursor-pointer opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"/>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Home
