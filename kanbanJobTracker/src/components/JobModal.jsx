import { useState, useEffect, useRef } from "react";
import { DEFAULT_PLATFORMS } from "../utils/helpers";
import "./JobModal.css";

const STATUSES = ["applied", "interviewing", "offer", "rejected"];
const PRIORITIES = ["High", "Medium", "Low"];

const emptyForm = {
  company: "",
  role: "",
  salary: "",
  status: "applied",
  dateApplied: new Date().toISOString().split("T")[0],
  notes: "",
  priority: "Medium",
  link: "",
  platform: "LinkedIn",
};

export default function JobModal({ job, onSave, onClose }) {
  const [form, setForm] = useState(job ? { ...job } : { ...emptyForm });
  const [platforms, setPlatforms] = useState(() => {
    const saved = localStorage.getItem("kanban-platforms");
    return saved ? JSON.parse(saved) : DEFAULT_PLATFORMS;
  });
  const [newPlatform, setNewPlatform] = useState("");
  const [errors, setErrors] = useState({});
  const overlayRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("kanban-platforms", JSON.stringify(platforms));
  }, [platforms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const addPlatform = () => {
    const trimmed = newPlatform.trim();
    if (trimmed && !platforms.includes(trimmed)) {
      setPlatforms((p) => [...p, trimmed]);
      setForm((f) => ({ ...f, platform: trimmed }));
      setNewPlatform("");
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.company.trim()) errs.company = "Company name is required.";
    if (!form.role.trim()) errs.role = "Role is required.";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave(form);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{job ? "Edit Job" : "Add New Job"}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Company <span className="required">*</span></label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                className={errors.company ? "input--error" : ""}
              />
              {errors.company && <span className="error-msg">{errors.company}</span>}
            </div>
            <div className="form-group">
              <label>Role <span className="required">*</span></label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className={errors.role ? "input--error" : ""}
              />
              {errors.role && <span className="error-msg">{errors.role}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salary (PHP)</label>
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. 40000"
                type="number"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Date Applied</label>
              <input
                name="dateApplied"
                value={form.dateApplied}
                onChange={handleChange}
                type="date"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange}>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Platform</label>
            <div className="platform-row">
              <select name="platform" value={form.platform} onChange={handleChange}>
                {platforms.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <input
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
                placeholder="Add platform..."
                onKeyDown={(e) => e.key === "Enter" && addPlatform()}
              />
              <button className="btn-secondary btn-sm" type="button" onClick={addPlatform}>+</button>
            </div>
          </div>

          <div className="form-group">
            <label>Job Posting URL</label>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://..."
              type="url"
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Referral, recruiter name, tips..."
              rows={3}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>
            {job ? "Save Changes" : "Add Job"}
          </button>
        </div>
      </div>
    </div>
  );
}
