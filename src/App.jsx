import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Register from './components/userauth/Register.jsx'
import Login from './components/userauth/Login.jsx'
import Registerc from './components/compauth/Registerc.jsx'
import Loginc from './components/compauth/Loginc.jsx'
import Companyhome from './components/jobs/companyhome.jsx'
import Postjob from './components/jobs/Postjob.jsx'
import Displayjobs from './components/jobs/Displayjobs.jsx'
import JobDetails from './components/jobs/JobDetails.jsx'
import Loger from './components/jobs/Loger.jsx'
import Profile from './components/userauth/Profile.jsx'

const approuter= createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/register',
    element:<Register/>,
  },
  {
    path:'/login',
    element:<Login/>,
  },
  {
    path:'/c/register',
    element:<Registerc/>,
  },
  {
    path:'/c/login',
    element:<Loginc/>,
  },
  {
    path:'/c/home',
    element:<Companyhome/>
  },
  {
    path:'/c/postjob',
    element:<Postjob/>,
  },
  {
    path:'jobs',
    element:<Displayjobs/>,
  },
  {
    path:'jobs/details',
    element:<JobDetails/>,
  },
  {
    path:'hello',
    element:<Loger/>,
  },
  {
    path:'profile',
    element:<Profile/>,
  },
]);

function App() {

  return (
    <div>
      <RouterProvider router={approuter}/>
    </div>
  )
}

export default App
