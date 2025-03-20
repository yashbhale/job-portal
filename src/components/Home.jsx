import { useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom';

const Home=()=> {

  const [search,setsearch]=useState("");
  const navigate = useNavigate();

  const handleChange=(e)=> {
    setsearch(e.target.value)
  }

  const handleSearch = () => {
    if(search.trim() !== ""){
      navigate(`/jobs?search=${search}`);
    }
  }

  return (
    <>
        <Navbar/>
        <div className="hero w-full flex flex-col items-center mt-24 gap-5">
          <div className="title text-5xl flex flex-col w-full items-center font-bold">
            <span>Search, Apply and</span>
            <span>Get Your Dream Job</span>
          </div>
          <div className="desc text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing hello elit. Minima odit eligendi hello baccho  </div>

          <div className="search flex w-[70%] justify-center">
            <input type='text' placeholder='Search your required job' name='search' value={search} onChange={handleChange} className="searchbar flex justify-between shadow-xl border border-rounded rounded-l-2xl overflow-hidden w-[65%] h-10 items-center pl-4"></input>
            <button onClick={handleSearch}>
              <svg className='bg-blue-800 p-2 text-wrap text-white rounded-r-2xl' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#9013fe"} fill={"none"}>
                <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="buttons mt-10 text-center">
        <Link to='/register'><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login as Job Seeker</button></Link>
        <Link to={'/c/register'}><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login as Employer</button></Link>
        </div>
    </>
  )
}

export default Home;
