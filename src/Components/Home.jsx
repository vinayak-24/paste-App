import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            setTitle(paste.title)
            setValue(paste.content)
        }
    }, [pasteId])

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) {
            //update
            dispatch(updateToPastes(paste));
        } else {
            //Create
            dispatch(addToPastes(paste));
        }

        //after creation or updation
        setTitle('');
        setValue('');
        searchParams({});
    }

    return (
        <div >
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    type="text"
                    className='p-2 rounded-2xl mt-4 w-[60%] pl-4'
                    value={title}
                    placeholder='Enter Title Here'
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button onClick={createPaste}
                    className='p-2 rounded-2xl mt-4 ' >
                    {pasteId ? "Update My Paste" : "Create My Paste"}
                </button>
            </div>

            <div className='mt-8'>
                <textarea
                    className='rounded-2xl mt-4 p-4 min-w-[500px]'
                    value={value}
                    placeholder='Add Content Here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    )
}

export default Home
