import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useSearchParams } from "react-router-dom";

const JobDetails = () => {
  const [searchParams] = useSearchParams();
  const jobapi = "http://localhost:5001/api/v1/job";
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]); // State for applied jobs

  useEffect(() => {
    const jobId = searchParams.get("id");
    const findJob = async () => {
      try {
        const res = await fetch(`${jobapi}/findjob?id=${jobId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch job details");

        const data = await res.json();
        setJob(data.job);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    findJob();
  }, [searchParams]);

  const handleApply = async () => {
    try {
      const res = await fetch(`${jobapi}/applyjob?id=${job._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to apply for job");

      const data = await res.json();
      console.log(data);
      setAppliedJobs(data.appliedJobs); // Update applied jobs state
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!job) return <p className="text-gray-500">Job not found.</p>;

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
            onClick={handleApply}
            className="text-white bg-[#451d9b] cursor-pointer hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2"
          >
            Apply
          </button>
        </div>

        <div className="jobdesc mt-8">
          <p className="text-lg">Job Description</p>
          <div className="line w-full h-[1px] border mt-2"></div>
        </div>

        <div className="informations flex flex-col gap-1 mt-10">
          <div className="field"><span className="font-semibold">Role: </span>{job.title}</div>
          <div className="field"><span className="font-semibold">Location: </span>{job.location}</div>
          <div className="field"><span className="font-semibold">Description: </span>{job.description}</div>
          <div className="field"><span className="font-semibold">Experience: </span>{job.minexp} years</div>
          <div className="field"><span className="font-semibold">Salary: </span>₹{job.salary}</div>
          <div className="field"><span className="font-semibold">Posted Date: </span>{new Date(job.createdAt).toLocaleDateString()}</div>
          <div className="field"><span className="font-semibold">Apply By: </span>{new Date(job.deadline).toLocaleDateString()}</div>
        </div>

        {/* Applied Jobs Table */}
        {appliedJobs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Location</th>
                  <th className="border p-2">Experience</th>
                  <th className="border p-2">Salary</th>
                  <th className="border p-2">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.map((job, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{job.title}</td>
                    <td className="border p-2">{job.location}</td>
                    <td className="border p-2">{job.minexp} years</td>
                    <td className="border p-2">₹{job.salary}</td>
                    <td className="border p-2">{new Date(job.deadline).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
