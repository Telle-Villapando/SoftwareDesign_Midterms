import { useState } from "react";
import { getHeatLevel, formatDate, getPlatformIcon } from "../utils/helpers";
import "./JobCard.css";

export default function JobCard({ job, allStatuses, onMove, onEdit, onDelete }) {
  const [showNotes, setShowNotes] = useState(false);
  const heat = getHeatLevel(job.dateApplied);
  const currentIndex = allStatuses.indexOf(job.status);
  const canForward = currentIndex < allStatuses.length - 1;
  const canBackward = currentIndex > 0;

  const priorityClass = {
    High: "priority--high",
    Medium: "priority--medium",
    Low: "priority--low",
  }[job.priority] || "priority--medium";

  return (
    <div className={`job-card heat--${heat.level}`}>
      <div className="job-card-header">
        <div className="job-card-title-group">
          <span className="job-platform-icon" title={job.platform}>
            {getPlatformIcon(job.platform)}
          </span>
          <div>
            <h3 className="job-company">{job.company}</h3>
            <p className="job-role">{job.role}</p>
          </div>
        </div>
        <div className="job-card-actions">
          <button className="icon-btn" onClick={() => onEdit(job)} title="Edit">✏️</button>
          <button className="icon-btn icon-btn--danger" onClick={() => onDelete(job.id)} title="Delete">🗑️</button>
        </div>
      </div>

      <div className="job-card-meta">
        {job.salary && (
          <span className="job-salary">₱{Number(String(job.salary).replace(/[^0-9]/g, "")).toLocaleString()}</span>
        )}
        <span className={`job-priority ${priorityClass}`}>{job.priority}</span>
        <span className={`heat-badge heat-badge--${heat.level}`} title={heat.label}>
          {heat.icon} {heat.label}
        </span>
      </div>

      <div className="job-card-date">
        Applied: {formatDate(job.dateApplied)}
      </div>

      {job.link && (
        <a className="job-link" href={job.link} target="_blank" rel="noopener noreferrer">
          🔗 View Posting
        </a>
      )}

      {job.notes && (
        <div className="job-notes-section">
          <button className="notes-toggle" onClick={() => setShowNotes((s) => !s)}>
            {showNotes ? "▴ Hide Notes" : "▾ Show Notes"}
          </button>
          {showNotes && <p className="job-notes">{job.notes}</p>}
        </div>
      )}

      <div className="job-card-footer">
        <button
          className="move-btn move-btn--back"
          disabled={!canBackward}
          onClick={() => onMove(job.id, "backward")}
          title="Move back"
        >
          ←
        </button>
        <span className="job-status-label">{job.status}</span>
        <button
          className="move-btn move-btn--forward"
          disabled={!canForward}
          onClick={() => onMove(job.id, "forward")}
          title="Move forward"
        >
          →
        </button>
      </div>
    </div>
  );
}
