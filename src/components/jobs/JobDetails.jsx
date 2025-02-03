import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useSearchParams } from 'react-router-dom';

const JobDetails = () => {
  const [searchParams] = useSearchParams();
  const jobapi = 'http://localhost:5001/api/v1/job';
  const [job, setJob] = useState(null); // Initialize with null to represent no data yet
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const jobId = searchParams.get('id');
    const findJob = async () => {
      try {
        const res = await fetch(`${jobapi}/findjob?id=${jobId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch job details');
        }

        const data = await res.json();
        setJob(data.job);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    findJob();
  }, [searchParams]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container px-24 mx-auto pt-8">
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container px-24 mx-auto pt-8">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div>
        <Navbar />
        <div className="container px-24 mx-auto pt-8">
          <p className="text-gray-500">Job not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container px-24 mx-auto pt-8">
        <div className="head flex justify-between items-center">
          <div className="start flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <div className="headlables flex gap-2">
              <div className="border p-1 oval rounded-2xl text-sm text-blue-400">12 Positions</div>
              <div className="border p-1 oval rounded-2xl text-sm text-red-400">Full time</div>
              <div className="border p-1 oval rounded-2xl text-sm text-blue-400">{job.salary}</div>
            </div>
          </div>

          <button
            type="button"
            className="text-white bg-[#451d9b] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 justify-center"
          >
            Apply
          </button>
        </div>

        <div className="jobdesc mt-8">
          <p className="text-lg">Job Description</p>
          <div className="line w-full h-[1px] border mt-2"></div>
        </div>

        <div className="informations flex flex-col gap-1 mt-10">
          <div className="field">
            <span className="font-semibold">Role: </span>
            <span className="text-gray-700">{job.title}</span>
          </div>
          <div className="field">
            <span className="font-semibold">Location: </span>
            <span className="text-gray-700">{job.location}</span>
          </div>
          <div className="field">
            <span className="font-semibold">Description: </span>
            <span className="text-gray-700">{job.description}</span>
          </div>
          <div className="field">
            <span className="font-semibold">Experience: </span>
            <span className="text-gray-700">{job.minexp}</span>
          </div>
          <div className="field">
            <span className="font-semibold">Salary: </span>
            <span className="text-gray-700">{job.salary}</span>
          </div>
          <div className="field">
            <span className="font-semibold">Total Applicants: </span>
            <span className="text-gray-700">45336</span>
          </div>
          <div className="field">
            <span className="font-semibold">Posted Date: </span>
            <span className="text-gray-700">{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="field">
            <span className="font-semibold">Apply By: </span>
            <span className="text-gray-700">{new Date(job.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
