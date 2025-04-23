import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
    const [jobs, setJobs] = useState([]);
    const jobapi = "http://localhost:5001/api/v1/job";
    const userapi = "http://localhost:5001/api/v1/user";
    const [resume, setResume] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${jobapi}/getuserjobs`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                const data = await res.json();
                console.log(data);

                setResume(data.resume); // Assuming the resume URL is in the response
                if (data.success) {
                    setJobs(data.jobs);
                } else {
                    console.log("Failed to fetch jobs:", data.message);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();

        // const getResume = async () => {
        //     try {
        //         const res = await fetch(`${userapi}/getresume`, {
        //             method: "GET",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             credentials: "include",
        //         });

        //         const data = await res.json();
        //         console.log(data);

        //         if (data.success) {
        //             setResume(data.resume);
        //         } else {
        //             console.log("Failed to fetch jobs:", data.message);
        //         }
        //     } catch (error) {
        //         console.error("Error fetching jobs:", error);
        //     }
        // };

        fetchJobs();
        // getResume();

    }, []);

    const handleclick=async()=> {
        navigate('/jobs')
    }

    return (
        <div>
            <Navbar />
            
            <div className="hero mx-[20%] border border-gray-300 rounded-xl p-10 mt-[4%]">
                
                <div className="dash flex gap-2 mx-6">
                    <img
                        width={50}
                        src="https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png"
                        alt="User"
                    />
                    <div className="info flex flex-col">
                        <div className="name">Yash Bhale</div>
                        <div className="desc">
                            I am a Fullstack Developer || Part-time Content Creator
                        </div>
                    </div>
                </div>

                <div className="contact flex flex-col mt-10">
                    <div className="phone flex gap-2">
                        <img width={20} src="src/assets/email.png" alt="Email" />
                        <p>yash22@vit.edu</p>
                    </div>
                    <div className="phone flex gap-2 mt-1">
                        <img width={20} src="src/assets/phone.png" alt="Phone" />
                        <p>8090464814</p>
                    </div>

                    <div className="skills gap-4 mt-4">
                        <h4>Skills</h4>
                        <div className="buttons">
                            <button className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2">
                                ReactJS
                            </button>
                            <button className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2">
                                Node.js
                            </button>
                            <button className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2">
                                MongoDB
                            </button>
                        </div>
                    </div>

                    <div className="skills gap-4 mt-4">
                        <h4>Resume</h4>
                        <div className="buttons text-blue-400">ResumeVit.pdf</div>
                    </div>
                    <button type="button" onClick={()=>{handleclick()}} className="text-white w-[20%] bg-[#050708] mt-4 hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 justify-center">
                    Apply for a Job
                    </button>
                        </div>
            </div>

            <div className="jobs mx-[20%] mt-7">
                <h1 className="font-bold text-xl">Applied Jobs</h1>

                <table className="table-auto w-full overflow-hidden rounded-sm">
                    <thead className="border-b-4">
                        <tr className="text-left">
                            <th>Role</th>
                            <th>Date</th>
                            <th>Application</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <tr key={job._id} className="border-b-2">
                                    <td>{job.title}</td>
                                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                                    <td>1001</td>
                                    <td>
                                        <FontAwesomeIcon icon={faList} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    No jobs found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
        
            <div className="resumecontainer max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-8">
  <h1 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Resume</h1>

  {resume ? (
    <div className="relative w-full overflow-hidden rounded-lg shadow">
      <iframe 
        src={resume} 
        width="100%" 
        height="600px" 
        className="w-full h-[600px] border-none rounded-lg"
        title="User Resume"
      ></iframe>
    </div>
  ) : (
    <div className="text-center text-gray-500 py-20">
      <p className="text-lg">Loading resume...</p>
    </div>
  )}
</div>

        
    </div>
        </div>
    );
};

export default Profile;
