const expresss = require("express");
const router = expresss.Router();
const {createJob,getJobs,deleteJob,updateJob}= require("../controllers/jobController");

router.post("/jobs", createJob);
router.get("/jobs", getJobs);
router.delete("/jobs/:id", deleteJob);
router.put("/jobs/:id", updateJob);

module.exports = router;