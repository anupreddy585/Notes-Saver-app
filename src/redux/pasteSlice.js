import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';



let savedPastes = [];
try {
  const stored = localStorage.getItem("pastes");
  savedPastes = stored ? JSON.parse(stored) : [];
} catch (error) {
  console.error("Invalid JSON in localStorage:", error);
  localStorage.removeItem("pastes"); // clean up bad data
}

const initialState = {
  pastes: savedPastes,
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  
  reducers: {
    
    addPastes: (state, action) => {
      let flag=false;
      const data = action.payload;
        if(data.title!=''&&data.content!=''){
        for(let i in savedPastes){
        if(savedPastes[i].title==data.title){
            flag=true;
            
        } 
    }       
            if(flag==true){
                alert("this page is already exists");
            }
            else {
            state.pastes.push(data);
            console.log(state.pastes);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Note created successfully");
            }
      }
    },

    updatePaste: (state, action) => {
         const data=action.payload;
         let index=state.pastes.findIndex((item)=>item.paste_id==data.paste_id);

         if(index>=0){
            state.pastes[index]=data;
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("updated successfully");
         }
    },

    removePaste: (state, action) => {
        const data=action.payload;
        let index=state.pastes.findIndex((item)=>item.paste_id==data.paste_id);
        if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("removed successfully");
        }
    },

    resetAllPaste: (state) => {
        state.pastes=[];
        localStorage.removeItem("pastes");
    },
  },
});

// Action creators
export const { addPastes, updatePaste, removePaste, resetAllPaste } = pasteSlice.actions;

export default pasteSlice.reducer;
