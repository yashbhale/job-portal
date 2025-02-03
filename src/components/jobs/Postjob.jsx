import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Postjob = () => {
  const jobapi="http://localhost:5001/api/v1/job";
  const [form,setForm]=useState({
    title:'',
    description:'',
    requirements:'',
    salary:'',
    location:'',
    jobtype:'',
    exp:'',
    pos:'',
  });
  const token = document.cookie.split(';').find(cookie => cookie.startsWith('token='));
  const tokenValue = token ? token.split('=')[1] : null;
  const [date, setDate] = useState(''); 

  const handleChange = (e) => {
    setDate(e.target.value); 
  };
  const getTokenFromCookies = () => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    if (token) {
      return token.split('=')[1];  // Extract the value after the '='
    }
    return null;  // Return null if token is not found
  }
  const handlechange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
        ...prevForm,
        [name]: value, // Dynamically update the field by its name
    }));
};

  const navigate=useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
  
    // Ensure form.requirements is a string before splitting
    const req = form.requirements
      ? form.requirements.split(',').map((skill) => skill.trim()).filter((skill) => skill !== '')
      : []; 

      const token = getTokenFromCookies();
console.log("Token from cookies:", token);
  
    const formdata = {
      title: form.title,
      description: form.description,
      reqskills: req, // This should now be a properly split array of skills
      salary: form.salary,
      location: form.location,
      jobtype: form.jobtype,
      minexp: form.exp,
      qualification: form.pos,
      deadline: date,
    };
    console.log("Token for creating job:", token);

    const res = await fetch(`${jobapi}/createjob`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
      credentials: 'include', // Include cookies in the request
    });
  
    const data = await res.json();
  
    if (data.success) {
      console.log("Job posted successfully");
      navigate('/c/home');
    } else {
      console.log("Job not posted successfully");
    }
  };
  

  return (
    <div>
      <Navbar/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="container w-[33%] h-[80%] flex flex-col m-auto mt-34 border rounded-lg p-4 font-semibold shadow-xl">
        <div className="first flex gap-1 justify-between">
            <div className="flex flex-col gap-1 mb-4">
                <label>Title</label>
                <input type='text' onChange={handlechange} className='px-4 py-2 border-[1px] rounded-md border-slate-300 shadow-sm' name='title' value={form.title} ></input>
            </div>
            <div className="ttl flex flex-col gap-1 mb-4">
                <label>Description</label>
                <input type='text' onChange={handlechange} className='px-4 py-2 border-[1px] rounded-md border-slate-300 shadow-sm' name='description' value={form.description} ></input>
            </div>
        </div>
        <div className="first flex gap-1 justify-between">
            <div className="ttl flex flex-col gap-1 mb-4">
                <label>Requirements</label>
                <input type='text' onChange={handlechange} className='px-4 py-2 border-[1px] rounded-md border-slate-300 shadow-sm' name='requirements' value={form.requirements} ></input>
            </div>
            <div className="ttl flex flex-col gap-1 mb-4">
                <label>Salary</label>
                <input type='text' onChange={handlechange} className='px-4 py-2 border-[1px] rounded-md border-slate-300 shadow-sm' name='salary' value={form.salary} ></input>
            </div>
        </div>
        <div className="first flex gap-1 justify-between">
            <div className="ttl flex flex-col gap-1 mb-4">
                <label>Location</label>
                <input type='text' onChange={handlechange} className='px-4 py-2 border-[1px] rounded-md border-slate-300 shadow-sm' name='location' value={form.location} ></input>
            </div>
            <div className="ttl flex flex-col gap-1 mb-4">
                <label>Job Type</label>
                <input type='text' onChange={handlechange} className='px-4 py-2 border-[1px] rounded-md border-slate-300 shadow-sm' name='jobtype' value={form.jobtype} ></input>
            </div>
        </div>
        <div className="first flex gap-1 justify-between">
            <div className="ttl flex flex-col gap-1 mb-4">
                <label>Experience Level</label>
                <input type='text' onChange={handlechange} className='px-4 py-2 border-[1px] rounded-md border-slate-300 shadow-sm' name='exp' value={form.exp} ></input>
            </div>
            <div className="ttl flex flex-col gap-1 mb-4">
                <label>Minimum qualification</label>
                <input type='text' onChange={handlechange} className='px-4 py-2 border-[1px] rounded-md border-slate-300 shadow-sm' name='pos' value={form.pos} ></input>
            </div>
        </div>

      <div className='flex gap-2 mb-4 items-center'>
      <label htmlFor="date">deadline</label>
      <input
        type="date" // Input type for date
        id="date"
        name="date"
        value={date} // Controlled input using state
        onChange={handleChange} // Handle the change event
        className="px-4 py-2 border-[1px] rounded-md border-slate-300 shadow-sm"
      />
    </div>
        <button type="button" onClick={handlesubmit} className="text-white w-full bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 justify-center">
              Post a Job
              </button>
              

      </div>
    </div>
  )
}

export default Postjob
