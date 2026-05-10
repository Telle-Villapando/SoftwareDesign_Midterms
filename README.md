# SoftwareDesign_Midterms

# Christelle Villapando
BSCPE 4-1

# JobFlow — Kanban Job Tracker

A full-stack Kanban-style job application tracker that helps you visualize and manage your entire job hunt pipeline — from first application to final offer.

---

## Features:

- **Kanban Pipeline:** Stage progression across Applied, Interviewing, Offer, and Rejected columns using forward `→` and backward `←` controls.
- **Heat Indicators:** Smart urgency system that color-codes cards green → yellow → orange → red based on days since applying, so you never miss a follow-up.
- **Statistics Dashboard:** Real-time summary bar showing total applications, interview rate, offer rate, and average salary in PHP.
- **Full CRUD:** Add, edit, and delete job listings via a clean modal form with validation.
- **Custom Platform Dropdown:** Pre-loaded with PH job platforms (LinkedIn, JobStreet, Kalibrr, etc.) with the ability to add your own.
- **Confetti Effect:** Fires a canvas confetti animation when a job reaches Offer status 🎉
- **Collapsible Columns:** Offer and Rejected columns collapse to keep the board clean as your pipeline grows.
- **MongoDB Persistence:** All data saved to MongoDB Atlas — survives refreshes and works across devices.

---

## Tech Stack:

- **Frontend:** React 18, Vite, CSS (custom dark theme)
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas, Mongoose
- **Cloud/DevOps:** Azure Static Web Apps (frontend), Azure App Service (backend), GitHub Actions CI/CD

---

## Demo:

**Live App:** https://wonderful-rock-0e067aa00.7.azurestaticapps.net

**API Base URL:** https://kanbanbackend-bzb0cgg2cpgqf3hc.southeastasia-01.azurewebsites.net/api/jobs

---

## Installation & Setup:

Follow these steps to get a local copy up and running.

### Prerequisites

- Node.js v22+
- npm
- MongoDB Atlas account

### 1. Clone the Repository

```bash
git clone https://github.com/Telle-Villapando/SoftwareDesign_Midterms.git
cd SoftwareDesign_Midterms
```

### 2. Install Dependencies

**Backend:**
```bash
cd expressNodeApp
npm install
```

**Frontend:**
```bash
cd kanbanJobTracker
npm install
```

### 3. Environment Variables

**Backend** — create a `.env` file inside `expressNodeApp/`:
```
MONGO_URI=mongodb+srv://admin:WpcR7kit3VASd59O@expressnodedb.fswlks5.mongodb.net/kanbanDB?retryWrites=true&w=majority
PORT=5000
```

**Frontend** — create a `.env` file inside `kanbanJobTracker/`:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the Project

**Backend** (Terminal 1):
```bash
cd expressNodeApp
node index.js
# Server running on port 5000
# Connected to MongoDB!
```

**Frontend** (Terminal 2):
```bash
cd kanbanJobTracker
npm run dev
# http://localhost:5173
```

---

## Project Structure:

```
SoftwareDesign_Midterms/
├── kanbanJobTracker/               # React frontend
│   └── src/
│       ├── components/             # Board, Column, JobCard, JobModal, StatsBar
│       ├── reducer/                # useReducer state management
│       └── utils/                  # API calls, heat level helpers
│
└── expressNodeApp/                 # Express backend
    ├── API/
    │   └── jobs.js                 # CRUD route handlers
    ├── models/
    │   └── Job.js                  # Mongoose schema
    └── index.js                    # Server entry point
```

---

## Contributing:

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## License:

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact:

Telle Villapando - [GitHub](https://github.com/Telle-Villapando)

Project Link: https://github.com/Telle-Villapando/SoftwareDesign_Midterms
