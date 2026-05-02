const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs.' });
  }
});

// POST create job
router.post('/jobs', async (req, res) => {
  try {
    const { company, role, salary, status, dateApplied, notes, priority, link, platform } = req.body;

    const jobEntry = new Job({ company, role, salary, status, dateApplied, notes, priority, link, platform });
    const savedJob = await jobEntry.save(); // Save to MongoDB
    console.log('Saved Job:', savedJob);

    res.status(201).json({ message: 'Job added successfully!', data: savedJob });
  } catch (error) {
    console.error('Error saving job:', error);
    res.status(400).json({ message: 'Error saving job.' });
  }
});

// PUT update job (edit or move stage)
router.put('/jobs/:id', async (req, res) => {
  try {
    const { company, role, salary, status, dateApplied, notes, priority, link, platform } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id, // ← was req.id before (bug), now fixed
      { company, role, salary, status, dateApplied, notes, priority, link, platform },
      { new: true, runValidators: true }
    );
    console.log('Updated Job:', updatedJob);

    if (!updatedJob) return res.status(404).json({ message: 'Job not found.' });

    res.status(200).json({ message: 'Job updated successfully!', data: updatedJob });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(400).json({ message: 'Error updating job.' });
  }
});

// DELETE job
router.delete('/jobs/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    console.log('Deleted Job:', deletedJob);

    if (!deletedJob) return res.status(404).json({ message: 'Job not found.' });

    res.status(200).json({ message: 'Job deleted successfully!' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Error deleting job.' });
  }
});

module.exports = router;