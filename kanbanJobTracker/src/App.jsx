import { useReducer, useEffect, useState } from "react";
import Board from "./components/Board";
import StatsBar from "./components/StatsBar";
import JobModal from "./components/JobModal";
import ConfettiEffect from "./components/ConfettiEffect";
import { jobReducer, initialState } from "./reducer/jobReducer";
import "./App.css";
import {api} from "./utils/api";

const STAGES = ["applied", "interviewing", "offer", "rejected"];

export default function App() {
  const [state, dispatch] = useReducer(jobReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [confetti, setConfetti] = useState(false);

//Fetch all jobs from MongoDB on load 
  useEffect(() => {
    api.getJobs()
    .then(jobs => dispatch({ type: "SET_JOBS", payload: jobs }))
    .catch(err => console.error("Failed to fetch jobs:", err));
  }, []);

// add job
  const handleAddJob = async (jobData) => {
    try {
      const newJob = await api.createJob(jobData);
      dispatch({ type: "ADD_JOB", payload: newJob });
      setShowModal(false);
  }
   catch (err) {
      console.error("Failed to add job:", err);
    }
  };

  //edit job
  const handleEditJob = async (jobData) => {
    try {
      const updatedJob = await api.updateJob(editJob.id, jobData);
      dispatch({ type: "EDIT_JOB_SUCCESS", payload: updatedJob });
      setShowModal(false);
    } catch (err) {
      console.error("Failed to edit job:", err);
    }
  };

  // delete job
  const handleDeleteJob = async (id) => {
    try {
      await api.deleteJob(id);
      dispatch({ type: "DELETE_JOB", payload: id });
    } catch (err) {
      console.error("Failed to delete job:", err);
    }   
  };

// move stage
  const handleMoveJob = async (id, direction) => {
    const job = state.jobs.find((j) => j.id === id);
    const stages = ["applied", "interviewing", "offer", "rejected"];
    const currentIndex = stages.indexOf(job.status);
    const newIndex = direction === "forward" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex < 0 || newIndex >= stages.length) return;

    const newStatus = stages[newIndex];
    if (newStatus === "offer") setConfetti(true);

    try {
      const updatedJob = await api.updateJob(id, { ...job, status: newStatus });
      dispatch({ type: "MOVE_JOB_SUCCESS", payload: updatedJob });
    } catch (err) {
      console.error("Failed to move job:", err);
    }
  };

  const openEdit = (job) => {
    setEditJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditJob(null);
    setShowModal(false);
  };

  return (
    <div className="app">
      {confetti && <ConfettiEffect onDone={() => setConfetti(false)} />}

      <header className="app-header">
        <div className="header-top">
          <div className="header-brand">
            <span className="brand-icon">⟳</span>
            <div>
              <h1 className="brand-title">JobFlow</h1>
              <p className="brand-sub">Track your career pipeline</p>
            </div>
          </div>
          <button className="btn-add" onClick={() => setShowModal(true)}>
            <span>+</span> Add Job
          </button>
        </div>
        <StatsBar jobs={state.jobs} />
      </header>

      <main className="app-main">
        {state.loading ? (
          <div className="loading-state">Loading jobs...</div>
        ) : (
          <Board
            jobs={state.jobs}
            onMove={handleMoveJob}
            onEdit={openEdit}
            onDelete={handleDeleteJob}
          />
        )}
      </main>

      {showModal && (
        <JobModal
          job={editJob}
          onSave={editJob ? handleEditJob : handleAddJob}
          onClose={closeModal}
        />
      )}
    </div>
  );
}



