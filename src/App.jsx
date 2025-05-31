import Showpaste from './components/Showpaste'
import Paste from './components/Paste'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

 const router=createBrowserRouter(
  [
    {
      path:'/',
      element:
           <div>
              <Navbar/>
              <Home/>
           </div>, 
    },
    {
      path:'/pastes',
      element:
      <div>
            <Navbar/>
              <Paste/>
      </div>,
    },
    {
      path:'/pastes/:id',
      element:
         <div>
              <Navbar/>
              <Showpaste/>
         </div>,
    }
  ]
 )
function App() {


  return (
     <div>
      <RouterProvider router={router} />
      
     </div>
  )
}

export default App
