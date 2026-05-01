import { useReducer, useEffect, useState } from "react";
import Board from "./components/Board";
import StatsBar from "./components/StatsBar";
import JobModal from "./components/JobModal";
import ConfettiEffect from "./components/ConfettiEffect";
import { jobReducer, initialState } from "./reducer/jobReducer";
import "./App.css";

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
    localStorage.setItem("kanban-jobs", JSON.stringify(state.jobs));
  }, [state.jobs]);

  const handleAddJob = (jobData) => {
    dispatch({ type: "ADD_JOB", payload: jobData });
    setShowModal(false);
  };

  const handleEditJob = (jobData) => {
    dispatch({ type: "EDIT_JOB", payload: jobData });
    setEditJob(null);
    setShowModal(false);
  };

  const handleDeleteJob = (id) => {
    dispatch({ type: "DELETE_JOB", payload: id });
  };

  const handleMoveJob = (id, direction) => {
    const job = state.jobs.find((j) => j.id === id);
    const stages = ["applied", "interviewing", "offer", "rejected"];
    const currentIndex = stages.indexOf(job.status);
    const newIndex = direction === "forward" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex < 0 || newIndex >= stages.length) return;

    const newStatus = stages[newIndex];
    if (newStatus === "offer") setConfetti(true);

    dispatch({ type: "MOVE_JOB", payload: { id, status: newStatus } });
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
