import React, {useState} from 'react'

const SetsToolbar = ({searchQuery,searchChange,sortSelect,sortChange,openModal}) => {
    return (
        <div className="flex flex-col justify-between mx-6 md:flex-row">
            <div className="flex flex-col items-center w-full md:mr-5 md:text-left">
                <p className="w-full py-2 text-center text-lg pl-1 md:text-left">Search Sets</p>
                <input type="search" id="setSearch" name="search" placeholder="Complete Set Name..." className="w-full p-2 rounded-md border-4 border-4 border-gray-500 border-opacity-20 focus:border-green-500 outline-none h-full hover:border-green-500" onChange={searchChange} value={searchQuery}/>
            </div>
            <div className="flex flex-col items-center w-full md:mr-5 md:text-left mt-4 md:mt-0">
                <p className="w-full py-2 text-center text-lg pl-1 md:text-left">Sort By</p>
                <select id="setSort" name="Sort" value={sortSelect} onChange={sortChange} className="w-full p-2 rounded-md border-4 border-gray-500 border-opacity-20 focus:border-green-500 outline-none h-full cursor-pointer hover:border-green-500">
                    <option value="lowercaseName">Set Name (a - z)</option>
                    <option value="createdAt">Created Date (newest)</option>
                </select>
            </div>
            <button onClick={openModal} className="w-full md:w-64 bg-green-700 text-white rounded-md p-4 font-bold mt-4 md:mt-0 hover:bg-green-900">Create Set</button>
        </div>
    )
}

export default SetsToolbar
