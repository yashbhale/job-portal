import React, { useEffect } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar'
import { Link } from 'react-router-dom';

const Companyhome = () => {
    
    const [filter,setFilter]="";
    const [jobs,setJobs]=useState([]);
    const compapi="http://localhost:5001/api/v1/company"

    const handlechange=(e)=>{
        setFilter(e.target.value);
    }

    useEffect(() => {
      const fetchjobs=async()=>{
        const res=await fetch(`${compapi}/jobs`,{
          method:"GET",
          headers: {
            "Content-Type": "application/json",
              },
              credentials: 'include',
          })
          const data=await res.json();
          console.log("mmmmmmmmmm",data);
          setJobs(data.jobs);

        }

        fetchjobs();

    
    },[])
    



  return (
    <div>
      <Navbar/>
      <div className="container w-[75%] mx-auto mt-10">
        <div className="headbar flex justify-between items-center">
            <input onChange={handlechange} type='text' name='filter' value={filter} placeholder='Filter by Job Role'></input>
            <Link to={'/c/postjob'}><button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
              Post a Job
              </button>
              </Link>
        </div>

        <table className='table-auto w-full overflow-hidden rounded-sm'>
          <thead className='border-b-4'>
            <tr className='text-left'>      
              <th>Role</th>
              <th>Date</th>
              <th>Application</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=''>
            {
              jobs.map((job)=> (
                <tr key={job._id} className='border-b-2'>
                  <td>{job.title}</td>
                  <td>{job.createdAt}</td>
                  <td>1001</td>
                  <td><FontAwesomeIcon icon={faList} /></td>
              </tr>
              ))
            }
            
          </tbody>
        </table>

        <div className="comp text-gray-600 mx-auto text-center mt-6">This is the posted jobs</div>

      </div>
    </div>
  )
}

export default Companyhome
