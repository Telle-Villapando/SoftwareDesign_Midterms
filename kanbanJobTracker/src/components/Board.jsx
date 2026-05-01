import Column from "./Column";
import "./Board.css";

const COLUMNS = [
  { status: "applied",      title: "Applied",      color: "blue",   icon: "📤" },
  { status: "interviewing", title: "Interviewing",  color: "amber",  icon: "🎙️" },
  { status: "offer",        title: "Offer",         color: "green",  icon: "🎉" },
  { status: "rejected",     title: "Rejected",      color: "red",    icon: "📭" },
];

export default function Board({ jobs, onMove, onEdit, onDelete }) {
  return (
    <div className="board">
      {COLUMNS.map((col) => (
        <Column
          key={col.status}
          title={col.title}
          color={col.color}
          icon={col.icon}
          status={col.status}
          jobs={jobs.filter((j) => j.status === col.status)}
          allStatuses={COLUMNS.map((c) => c.status)}
          onMove={onMove}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
