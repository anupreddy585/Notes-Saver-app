import React from 'react'
import { useEffect, useState} from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';




const Showpaste = () => {

const [title,setTitle]=useState('');
const [value,setValue]=useState('');   
const {id}=useParams();
const allpastes=useSelector((state)=>state.paste.pastes);
const paste=allpastes.find((e)=>e.paste_id==id);
  return (
    <div>
    <div className='flex flex-row  place-content-between'>
       <input 
       className='mt-4 p-2 outline rounded-2xl min-w-110'
        type="text"
        placeholder='give some title'
        value={paste.title}
        disabled
        onChange={(e)=>{
            setTitle(e.target.value);
        }}
       />
      
    </div>
    <div >
        <textarea 
        value={paste.content}
        placeholder='enter something'
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        className='min-w-150 mt-4 p-3 outline rounded-2xl'
        disabled
        />
    </div>
    </div>
  )
}

export default Showpaste
