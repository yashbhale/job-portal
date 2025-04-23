import React, { useState } from 'react';
import Navbar from '../Navbar.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formdata, setFormData] = useState({
    name: '',
    phoneno: '',
    email: '',
    password: '',
    resume: null, // Added resume field
  });

  const userapi = "http://localhost:5001/api/v1/user";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formdata, resume: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', formdata.name);
    formData.append('phoneno', formdata.phoneno);
    formData.append('email', formdata.email);
    formData.append('password', formdata.password);
    if (formdata.resume) {
      formData.append('resume', formdata.resume);
    }
  
    console.log([...formData.entries()]); // Debugging: Check FormData content
  
    try {
      const res = await fetch(`${userapi}/register`, {
        method: "POST",
        body: formData, // Make sure there's no Content-Type set manually
      });
  
      const data = await res.json();
      console.log(data);
      if (data.success) {
        console.log("Register successful");
        navigate('/login');
      } else {
        console.log("Registration failed");
      }
    } catch (e) {
      console.log(e);
    }
  };
  

  return (
    <>
      <Navbar />
      

      
      <div className='main h-screen w-full relative bg-white pt-10'>
        <div className="container shadow-xl border rounded-xl h-[80%] justify-center w-1/2 p-3 px-6 bg-white mx-auto flex flex-col">
          <h1 className='font-bold text-2xl mb-8 mx-auto text-center'>Register</h1>

          <label className='text-xl px-6 mb-2'>Name</label>
          <input type='text' name='name' value={formdata.name} onChange={handleChange} className='p-2 mx-auto w-11/12 mb-6 border border-gray-600 rounded-xl'></input>

          <label className='text-xl px-6 mb-2'>Mobile No</label>
          <input type='text' name='phoneno' value={formdata.phoneno} onChange={handleChange} className='p-2 mx-auto w-11/12 mb-6 border border-gray-600 rounded-xl'></input>

          <label className='text-xl px-6 mb-2'>Email Id</label>
          <input type='text' name='email' value={formdata.email} onChange={handleChange} className='p-2 mx-auto w-11/12 mb-6 border border-gray-600 rounded-xl'></input>

          <label className='text-xl px-6 mb-2'>Password</label>
          <input type='password' name='password' value={formdata.password} onChange={handleChange} className='p-2 mx-auto w-11/12 border border-gray-600 rounded-xl'></input>

          <label className='text-xl px-6 mb-2'>Upload Resume</label>
          <input type="file" name="resume" onChange={handleFileChange} className='p-2 mx-auto w-11/12 border border-gray-600 rounded-xl' accept=".pdf,.doc,.docx"></input>

          <button type="button" onClick={handleSubmit} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-11/12 mx-auto ml-7">Register</button>

          <p className='size-8 w-64 mb-4'>Already a user? <Link to={'/login'}><span className='text-blue-600'>Login</span></Link></p>
        </div>
      </div>
    </>
  );
};

export default Register;
