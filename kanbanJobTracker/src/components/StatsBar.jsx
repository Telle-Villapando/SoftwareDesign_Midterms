import "./StatsBar.css";

export default function StatsBar({ jobs }) {
  const total = jobs.length;
  const interviewing = jobs.filter((j) => j.status === "interviewing").length;
  const offers = jobs.filter((j) => j.status === "offer").length;
  const rejected = jobs.filter((j) => j.status === "rejected").length;

  const interviewRate = total > 0 ? Math.round((interviewing / total) * 100) : 0;
  const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  const salaries = jobs
    .map((j) => parseFloat(String(j.salary).replace(/[^0-9.]/g, "")))
    .filter((s) => !isNaN(s) && s > 0);
  const avgSalary =
    salaries.length > 0
      ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length)
      : 0;

  const fmt = (n) =>
    n.toLocaleString("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 });

  const stats = [
    { label: "Total Applied", value: total, icon: "📋", accent: "var(--accent-blue)" },
    { label: "Interviewing", value: interviewing, icon: "🎙️", accent: "var(--accent-amber)" },
    { label: "Interview Rate", value: `${interviewRate}%`, icon: "📈", accent: "var(--accent-teal)" },
    { label: "Offers", value: offers, icon: "🎉", accent: "var(--accent-green)" },
    { label: "Offer Rate", value: `${offerRate}%`, icon: "✨", accent: "var(--accent-purple)" },
    { label: "Avg. Salary", value: avgSalary > 0 ? fmt(avgSalary) : "—", icon: "💰", accent: "var(--accent-rose)" },
    { label: "Rejected", value: rejected, icon: "📭", accent: "var(--accent-red)" },
  ];

  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div className="stat-card" key={s.label} style={{ "--card-accent": s.accent }}>
          <span className="stat-icon">{s.icon}</span>
          <div className="stat-info">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
