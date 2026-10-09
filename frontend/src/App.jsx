import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'


function App() {
  const [job, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [fromData, setFormData] = useState({
    companyName: "",
    jobRole: "",
    location: "",
    appliedDate: "",
    status: "Applied",
    salary: "",
    jobUrl: "",
  });

  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then((response) => {
        setJobs(response.data.jobs);
      })
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
      })
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {

        await axios.put(`http://localhost:5000/api/jobs/${editId}`, fromData);

        const response = await axios.get(
          "http://localhost:5000/api/jobs"
        );

        setJobs(response.data.jobs);
        setEditId(null);

      } else {

        const response = await axios.post(
          "http://localhost:5000/api/jobs",
          fromData
        );

        setJobs((prevJobs) => [
          ...prevJobs,
          response.data.job
        ]);
      }

      setFormData({
        companyName: "",
        jobRole: "",
        location: "",
        appliedDate: "",
        status: "Applied",
        salary: "",
        jobUrl: "",
      });

    } catch (error) {
      console.error("Failed to save job:", error);
    }
  };






  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };
  const handleUpdate = async (job) => {
    setEditId(job.id);
    setFormData({
      companyName: job.companyName,
      jobRole: job.jobRole,
      location: job.location,
      appliedDate: job.appliedDate,
      status: job.status,
      salary: job.salary,
      jobUrl: job.jobUrl,
    });
  };

  const [statusFilter, setStatusFilter] = useState("All");

  const filteredJobs = job.filter((job) => {
    const matchesSearch =
      job.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      job.jobRole?.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  const totalJobs = job.length;
  const appliedJobs = job.filter((job) => job.status === "Applied").length;
  const interviewingJobs = job.filter((job) => job.status === "Interviewing").length;
  const offeredJobs = job.filter((job) => job.status === "Offered").length;
  const rejectedJobs = job.filter((job) => job.status === "Rejected").length;


  return (
    <>

      <div>
        <h1>Job Application Tracker </h1>

        <div>
          <h2>Job Applications Dashboard</h2>
          <p>Total Applications: {totalJobs}</p>
          <p>Applied: {appliedJobs}</p>
          <p>Interviewing: {interviewingJobs}</p>
          <p>Offered: {offeredJobs}</p>
          <p>Rejected: {rejectedJobs}</p>
        </div>
        <input type="text" placeholder="Search by company name" value={search} onChange={(e) => setSearch(e.target.value)} />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Company Name" value={fromData.companyName} onChange={(e) => setFormData({ ...fromData, companyName: e.target.value })} />
          <br />
          <input type="text" placeholder="Job Role" value={fromData.jobRole} onChange={(e) => setFormData({ ...fromData, jobRole: e.target.value })} />
          <br />
          <input type="text" placeholder="Location" value={fromData.location} onChange={(e) => setFormData({ ...fromData, location: e.target.value })} />
          <br />
          <input type="date" value={fromData.appliedDate} onChange={(e) => setFormData({ ...fromData, appliedDate: e.target.value })} />
          <br />
          <input type="text" placeholder="Salary" value={fromData.salary} onChange={(e) => setFormData({ ...fromData, salary: e.target.value })} />
          <br />


          <select value={fromData.status} onChange={(e) => setFormData({ ...fromData, status: e.target.value })}>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
          <br />

          <input type="text" placeholder="Job URL" value={fromData.jobUrl} onChange={(e) => setFormData({ ...fromData, jobUrl: e.target.value })} />
          <br />
          <button type="submit">
            {editId ? "Update Job" : "Add Job"}
          </button>
        </form>
        {filteredJobs.map((job) => (
          <div key={job.id}>
            <h2>{job.companyName}</h2>
            <p>Role:{job.jobRole}</p>
            <p>Location:{job.location}</p>
            <p>Status:{job.status}</p>
            <p>Salary:{job.salary}</p>
            <button onClick={() => handleUpdate(job)}>Edit</button>
            <button onClick={() => handleDelete(job.id)}>Delete</button>
          </div>
        ))}
      </div>


    </>
  )

}

export default App
