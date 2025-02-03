import React, {useState} from 'react'
import Navbar from '../Navbar.jsx'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [formdata,setformdata] = useState({
    name:'',
    password:'',
  });
  const navigate=useNavigate();
  const userapi="http://localhost:5001/api/v1/user"

  const handleChange=(e)=> {
    setformdata({...formdata,[e.target.name]:e.target.value})
  };

  const handleSubmit=  async  ()=> {
    await console.log("heyyyyyyyyyyyyyyy")
    const form = {
        email:formdata.name,
        password:formdata.password,
    }
    const res = await fetch(`${userapi}/login`,{
        method:'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body:JSON.stringify(form),
    })
    const data=await res.json();
    console.log("hi");
    await console.log(data);
    if(data.success==true)
    {
      console.log("Login Successful");
      navigate('/');
    }
    else {
      console.log("Name or password doesnt match");
    }
  }

  return (
    <>
    <Navbar/>
    <div className=' main h-screen w-full relative bg-white pt-36'>


      <div className="container shadow-xl border rounded-xl h-2/3 w-1/2 p-3 px-6 bg-white mx-auto flex flex-col">
        <h1 className='font-bold text-2xl mb-8 mx-auto text-center'>Login</h1>
        <label className='text-xl px-6 mb-2'>Email</label>
        <input type='text' name='name' value={formdata.name} onChange={handleChange} className='p-2 mx-auto w-11/12 mb-6  border border-gray-600 rounded-xl'></input>

        <label className='text-xl px-6 mb-2'>Password</label>
        <input type='text' name='password' value={formdata.password} onChange={handleChange} className='p-2 mx-auto w-11/12  border border-gray-600 rounded-xl'></input>

        <button type="button" onClick={handleSubmit} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-10  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-11/12 mx-auto ml-7">Login</button>
        

      </div>

    </div>
    </>
  )
}

export default Login
