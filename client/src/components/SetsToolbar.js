import React, {useState} from 'react'

const SetsToolbar = ({searchQuery,searchChange,sortSelect,sortChange,openModal}) => {
    return (
        <div className="flex flex-row justify-between mx-6">
            <div className="flex flex-grow flex-col mr-5">
                <p className="w-full py-2 text-left text-lg pl-1">Search Sets</p>
                <input type="search" id="setSearch" name="search" placeholder="Creator, Set, Picture Name..." className="p-2 rounded-md border-4 border-4 border-gray-500 border-opacity-20 focus:border-green-500 outline-none h-full hover:border-green-500" onChange={searchChange} value={searchQuery}/>
            </div>
            <div className="flex flex-col">
                <p className="w-full py-2 text-left text-lg pl-1">Sort By</p>
                <select id="setSort" name="Sort" value={sortSelect} onChange={sortChange} className="p-2 rounded-md border-4 border-gray-500 border-opacity-20 focus:border-green-500 outline-none h-full cursor-pointer hover:border-green-500">
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="Creator">Creator</option>
                </select>
            </div>
            <button onClick={openModal} className="bg-green-700 text-white rounded-md ml-5 p-4 font-bold">Create Set</button>
        </div>
    )
}

export default SetsToolbar
