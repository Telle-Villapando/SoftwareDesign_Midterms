import { useReducer, useEffect, useState } from "react";
import Board from "./components/Board";
import StatsBar from "./components/StatsBar";
import JobModal from "./components/JobModal";
import ConfettiEffect from "./components/ConfettiEffect";
import { jobReducer, initialState } from "./reducer/jobReducer";
import "./App.css";
import {api} from "./utils/api";

export default function App() {
  const [state, dispatch] = useReducer(jobReducer, initialState, (init) => {
    const saved = localStorage.getItem("kanban-jobs");
    if (saved) {
      try {
        return { ...init, jobs: JSON.parse(saved) };
      } catch {
        return init;
      }
    }
    return init;
  });

  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    api.getJobs().then(jobs => {
      dispatch({ type: "SET_JOBS", payload: jobs });
    });
  }, []);

// add job
  const handleAddJob = async (jobData) => {
    const newJob = await api.createJob(jobData);
    dispatch({ type: "ADD_JOB", payload: newJob });
    setShowModal(false);
  };

  //edit job
  const handleEditJob = async (jobData) => {
    const updatedJob = await api.updateJob(editJob.id, jobData);
    dispatch({ type: "EDIT_JOB_SUCCESS", payload: updatedJob });
    setShowModal(false);
  };

  // delete job
  const handleDeleteJob = async (id) => {
    await api.deleteJob(id);
    dispatch({ type: "DELETE_JOB", payload: id });
  };

// move stage
  const handleMoveJob = async (id, direction) => {
    const job = state.jobs.find((j) => j.id === id);
    const stages = ["applied", "interviewing", "offer", "rejected"];
    const currentIndex = stages.indexOf(job.status);
    const newIndex = direction === "forward" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex < 0 || newIndex >= stages.length) return;

    //const newStatus = stages[newIndex];
    const updated = await api.updatedJob(id, {status: newStatus});
    if (newStatus === "offer") setConfetti(true);

    dispatch({ type: "MOVE_JOB_SUCCESS", payload: updated });
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
        <Board
          jobs={state.jobs}
          onMove={handleMoveJob}
          onEdit={openEdit}
          onDelete={handleDeleteJob}
        />
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
