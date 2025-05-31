import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { removePaste } from '../redux/pasteSlice';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
    const pastes=useSelector((state)=>state.paste.pastes);
    const dispatch = useDispatch();
    const [search,setSearch]=useState('');
    const filterdata=pastes.filter(
        (paste)=>paste.title.toLowerCase().includes(search.toLowerCase())
    );
    function handleDelete(data){
        dispatch(removePaste(data));
    }
   
  
    return (
    <div>
      <input
      className='mt-4 rounded-2xl p-3 min-w-120'
      type='search'
      placeholder='search something'
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />
      <div className='flex flex-col mt-1 gap-7'>
         {
            filterdata.length>0 &&
            filterdata.map(
                (paste)=>{
                    return(
                        <div className='border rounded-2xl' key={paste.paste_id}>
                            <div >
                             {paste.title}<br/>
                             {paste.content}
                             </div>
                             <div className='mt-2 m-1.5 flex gap-2 place-content-around'>
                               <button>
                                <NavLink to={`/pastes/${paste.paste_id}`}>view</NavLink>
                               </button>
                               <button>
                                <NavLink to={`/?pasteId=${paste.paste_id}`}>edit</NavLink>
                               </button>
                               <button>
                                share
                               </button>
                               <button onClick={()=>handleDelete(paste)}>
                                delete
                               </button>
                               <button onClick={()=>{
                                navigator.clipboard.writeText(paste.content);
                                toast.success("copied to clipboard");
                               }}>
                                copy
                               </button>
                             </div>
                             
                        </div>
                        
                    )
                }
            )
         }
      </div>
    </div>
  )
}

export default Paste
