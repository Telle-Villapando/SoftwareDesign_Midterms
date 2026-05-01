import { useState } from "react";
import JobCard from "./JobCard";
import "./Column.css";

export default function Column({ title, color, icon, status, jobs, allStatuses, onMove, onEdit, onDelete }) {
  const [collapsed, setCollapsed] = useState(false);
  const isTerminal = status === "offer" || status === "rejected";

  return (
    <div className={`column column--${color} ${collapsed ? "column--collapsed" : ""}`}>
      <div className="column-header" onClick={() => isTerminal && setCollapsed((c) => !c)}>
        <div className="column-header-left">
          <span className="column-icon">{icon}</span>
          <h2 className="column-title">{title}</h2>
          <span className="column-count">{jobs.length}</span>
        </div>
        {isTerminal && (
          <button className="collapse-btn" title={collapsed ? "Expand" : "Collapse"}>
            {collapsed ? "▾" : "▴"}
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="column-body">
          {jobs.length === 0 ? (
            <div className="column-empty">
              <span>No jobs here yet</span>
            </div>
          ) : (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                allStatuses={allStatuses}
                onMove={onMove}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
