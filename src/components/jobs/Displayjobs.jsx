import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useNavigate, useLocation } from 'react-router-dom';
import { FiBookmark, FiClock, FiMapPin, FiDollarSign, FiBriefcase } from 'react-icons/fi';

const Displayjobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const jobapi = "http://localhost:5001/api/v1/job";
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchjobs = async () => {
            try {
                setLoading(true);
                const searchParams = new URLSearchParams(location.search);
                const searchQuery = searchParams.get('search');
                
                let url = `${jobapi}/displayjobs`;
                if (searchQuery) {
                    url += `?search=${searchQuery}`;
                }

                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                setJobs(data.job);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchjobs();
    }, [location.search]);

    const handleclick = (path) => {
        navigate(`${path}`);
    }

    // Format date to "X days ago"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }

    // Truncate description to 100 characters
    const truncateDescription = (text) => {
        return text.length > 100 ? `${text.substring(0, 100)}...` : text;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
                    </h1>
                    {/* Add search/filter components here if needed */}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-700">No jobs found</h3>
                        <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <div 
                                key={job._id} 
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <span className="inline-flex items-center text-sm text-gray-500">
                                            <FiClock className="mr-1" />
                                            {formatDate(job.createdAt || new Date())}
                                        </span>
                                        <button className="text-gray-400 hover:text-purple-600">
                                            <FiBookmark />
                                        </button>
                                    </div>

                                    <div className="mt-4 flex items-center">
                                        <div className="flex-shrink-0">
                                            <img 
                                                className="h-12 w-12 rounded-lg object-contain border border-gray-200" 
                                                src={job.comp.logo || 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'} 
                                                alt={job.comp.name}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png';
                                                }}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-800">{job.comp.name}</h3>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <FiMapPin className="mr-1" />
                                                {job.location}
                                            </div>
                                        </div>
                                    </div>

                                    <h2 className="mt-4 text-xl font-bold text-gray-900">{job.title}</h2>
                                    <p className="mt-2 text-gray-600">
                                        {truncateDescription(job.description)}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            <FiBriefcase className="mr-1" />
                                            {job.type || 'Full-time'}
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            <FiDollarSign className="mr-1" />
                                            {job.salary || 'Negotiable'}
                                        </span>
                                        {job.positions && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {job.positions} positions
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-6 flex space-x-3">
                                        <button 
                                            onClick={() => handleclick(`/jobs/details?id=${job._id}`)}
                                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                                        >
                                            View Details
                                        </button>
                                        <button 
                                            className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Displayjobs