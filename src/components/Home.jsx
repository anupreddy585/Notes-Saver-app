import React, { useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPastes } from '../redux/pasteSlice';
import { updatePaste } from '../redux/pasteSlice';
const Home = () => {
    const [title,setTitle]=useState('');
    const [value,setValue]=useState('');
    const [searchparams,setsearchparams]=useSearchParams();
    const  pasteId=searchparams.get("pasteId");
    const dispatch = useDispatch();
    const allpastes=useSelector((state)=>state.paste.pastes);
          useEffect(() => {
           if (pasteId) {
           const paste = allpastes.find((e) => e.paste_id == pasteId);
           if (paste) {
           setTitle(paste.title);
           setValue(paste.content);
          }
          }
          }, [pasteId, allpastes]);



  
    function createPaste(){
        const data={
            title:title,
            content:value,
            paste_id:pasteId||Date.now().toString(35),
            createdate:new Date().toISOString()
        }
        if(pasteId){
             dispatch(updatePaste(data));
        }
        else{
           
           dispatch(addPastes(data))
        }
        setTitle('');
        setValue('');
        setsearchparams({});
        

    }

  return (
    <div>
    <div className='flex flex-row  place-content-between'>
       <input 
       className='mt-4 p-2 outline rounded-2xl min-w-110'
        type="text"
        placeholder='give some title'
        value={title}
        onChange={(e)=>{
            setTitle(e.target.value);
        }}
       />
       <button onClick={createPaste} className='mt-4 p-2 outline rounded-2xl'>
         {
            pasteId?"update paste" :"create paste"
         }
       </button>
    </div>
    <div >
        <textarea 
        value={value}
        placeholder='enter something'
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        className='min-w-150 mt-4 p-3 outline rounded-2xl'

        />
    </div>
    </div>

  )
}

export default Home
