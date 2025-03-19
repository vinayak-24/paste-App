import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {

    const { id } = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.filter((p) => p._id === id)[0];
    console.log("Final Paste: ", paste)

    return (
        <div >
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    type="text"
                    className='p-2 rounded-2xl mt-4 w-[60%] pl-4'
                    value={paste.title}
                    disabled
                    placeholder='Enter Title Here'
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className='mt-8'>
                <textarea
                    className='rounded-2xl mt-4 p-4 min-w-[500px]'
                    value={paste.content}
                    disabled
                    placeholder='Add Content Here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    )
}

export default ViewPaste
