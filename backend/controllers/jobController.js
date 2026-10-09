const Job = require("../models/job");

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({
        message: "Job added successfully",
        job,
    });
  } catch (error) {
    res.status(500).json({ 
        message: "Failed to add job",
        error:error.message,
     });
  }
};

const getJobs = async (req, res) => {
  try{
    const jobs = await Job.findAll({
order:[["createdAt", "DESC"]],
    });
    res.status(200).json({
      message: "Jobs fetchedsuccessfully",
        jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs",
      error:error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const {id} = req.params;
    const job = await Job.findByPk(id);

    if(!job){
      return res.status(404).json({
        message: "Job not found",
      });
    }
    await job.destroy();
    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete job",
      error:error.message,
    });
  }
};

const updateJob = async (req, res) => {
 try{
  const {id} = req.params;
  const job = await Job.findByPk(id); 
  if(!job){
    return res.status(404).json({
      message: "Job not found",
    });
  }
  await job.update(req.body);
  res.status(200).json({
    message: "Job updated successfully",
    job,
  });
 }catch (error) {
  res.status(500).json({
    message: "Failed to update job",
    error:error.message,
  });
 }
};

module.exports = {
  createJob,
  getJobs,
  deleteJob,
  updateJob,
};





