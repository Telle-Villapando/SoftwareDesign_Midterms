export const DEFAULT_PLATFORMS = [
  "LinkedIn",
  "Indeed",
  "Glassdoor",
  "JobStreet",
  "Kalibrr",
  "Company Website",
  "Referral",
  "Facebook",
  "Other",
];

export function getHeatLevel(dateApplied) {
  if (!dateApplied) return { level: "none", label: "No date", icon: "⚪" };
  const days = Math.floor((new Date() - new Date(dateApplied)) / (1000 * 60 * 60 * 24));

  if (days < 3) return { level: "green", label: `${days}d ago`, icon: "🟢" };
  if (days < 7) return { level: "yellow", label: `${days}d ago`, icon: "🟡" };
  if (days < 14) return { level: "orange", label: `${days}d ago`, icon: "🟠" };
  return { level: "red", label: `${days}d ago — Follow up!`, icon: "🔴" };
}

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
}

export function getPlatformIcon(platform) {
  const icons = {
    LinkedIn: "in",
    Indeed: "Id",
    Glassdoor: "Gd",
    JobStreet: "JS",
    Kalibrr: "Ka",
    "Company Website": "🌐",
    Referral: "👥",
    Facebook: "fb",
    Other: "📌",
  };
  return icons[platform] || "📌";
}
