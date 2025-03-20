import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useNavigate, useLocation } from 'react-router-dom';

const Displayjobs = () => {

    const [jobs, setJobs] = useState([]);
    const jobapi = "http://localhost:5001/api/v1/job";
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchjobs = async () => {
            const searchParams = new URLSearchParams(location.search);
            const searchQuery = searchParams.get('search'); // Get 'search' query param
            
            let url = `${jobapi}/displayjobs`;
            if (searchQuery) {
                url += `?search=${searchQuery}`; // Add search param to API URL
            }

            const res = await fetch(url, {
                method: "GET",
                headers: { // You had 'header' instead of 'headers'
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json();
            console.log(data);
            setJobs(data.job);
        }
        fetchjobs();
    }, [location.search]); // Refetch if URL changes (search query changes)

    const handleclick = (path) => {
        navigate(`${path}`);
    }

    return (
        <div>
            <Navbar />
            <p className='h-10 px-28 mt-10 mx-auto text-xl font-bold'>
                Search Results: {jobs.length} jobs found
            </p>
            <div className="container mx-auto mt-10 h-screen grid grid-cols-3 gap-10 p-10 px-22">
                {
                    jobs.map((job) => (
                        <div key={job._id} className="card flex flex-col w-96 h-80 shadow-xl p-4 rounded-lg border">
                            <div className="upper flex justify-between">
                                <p className='text-gray-400'>2 days ago</p>
                                <img src='../../../public/bookmark.png' width={24}></img>
                            </div>

                            <div className="namer flex items-center gap-4 mt-3 ml-4">
                                <div className="square border rounded-md w-10 h-10 pl-1 pt-1">
                                    <img className='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' width={32}></img>
                                </div>
                                <div className="title flex flex-col">
                                    <div className="name text-lg font-bold">{job.comp.name}</div>
                                    <div className="country text-gray-300">{job.location}</div>
                                </div>
                            </div>
                            <div className="head text-lg font-bold mt-3">{job.title}</div>
                            <p className='text-gray-500 justify-normal text-sm'>{job.description}</p>

                            <div className="desc flex gap-2 mt-3">
                                <div className="border p-1 oval rounded-2xl text-sm text-blue-400">12 Positions</div>
                                <div className="border p-1 oval rounded-2xl text-sm text-blue-400">Part time</div>
                                <div className="border p-1 oval rounded-2xl text-sm text-blue-400">{job.salary}</div>
                            </div>
                            <div className="buttons flex gap-1 mt-3">
                                <button type="button" onClick={() => handleclick(`/jobs/details?id=${job._id}`)} className="cursor-pointer border bg-[#f5f7f7] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 justify-center">
                                    Details
                                </button>
                                <button type="button" className="text-white bg-[#451d9b] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 justify-center">
                                    Save for later
                                </button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Displayjobs
