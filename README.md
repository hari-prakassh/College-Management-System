# 🎓 Apex College Management System (Monolithic Single Deployable Unit)

A complete, self-contained, enterprise-grade College Management System built as a modular monolith. Designed for instant zero-configuration deployment to any public hosting platform (Render, Railway, Fly.io, Docker, Heroku, or VPS) and fully responsive across mobile, tablet, and desktop viewports.

---

## 🏛️ Skeletal Architecture & Structure

```
+-----------------------------------------------------------------------------------+
|                            CLIENT / BROWSER TIERS                                 |
|      (Responsive Mobile / Tablet / Desktop SPA - Tailwind CSS + Lucide Icons)     |
+-----------------------------------------+-----------------------------------------+
                                          | HTTP / REST API & Static Assets
                                          v
+-----------------------------------------------------------------------------------+
|                  MONOLITHIC SERVER (Node.js / Express Gateway)                    |
|                                                                                   |
|  * Static File Server (/public SPA bundle)                                        |
|  * REST API Gateway (/api/v1/...)                                                 |
|  * JWT Auth & Role-Based Access Control (RBAC)                                    |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                             CORE DOMAIN MODULES                             |  |
|  |  [ Auth & Security ]   [ Student Management ]   [ Faculty & Staff ]         |  |
|  |  [ Academics/Depts ]   [ Attendance Engine ]    [ Exams & Grades (GPA) ]    |  |
|  |  [ Fees & Billing ]    [ Timetable Engine ]     [ Circulars & Notices ]     |  |
|  |  [ Institutional KPI & Academic Analytics Engine ]                          |  |
|  +-----------------------------------------------------------------------------+  |
|                                         |                                         |
|  +--------------------------------------v--------------------------------------+  |
|  |                  DATA ACCESS LAYER (SQLite with WAL Mode)                   |  |
|  |  * Self-contained Embedded Relational Database (0 External DB Dependencies) |  |
|  |  * Automatic Schema Migration & Demo Seeding on Boot                        |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### 📁 File Tree Layout
```
college-management-system/
├── package.json              # Single unified package & deployment scripts
├── server.js                 # Monolithic entrypoint (Express API + SPA Static Server)
├── Dockerfile                # Multi-stage production container image
├── render.yaml               # 1-click Render.com cloud blueprint
├── railway.json              # Railway deployment config
├── .env.example              # Environment variables template
├── database/
│   ├── db.js                 # SQLite adapter (Node.js native node:sqlite + fallback)
│   ├── schema.sql            # Full relational schema with indexes
│   └── seed.js               # Realistic institutional demo seed generator
├── middleware/
│   ├── auth.js               # JWT verification & RBAC middleware
│   └── errorHandler.js       # Centralized error handler
├── routes/
│   ├── authRoutes.js         # Authentication & profiles
│   ├── dashboardRoutes.js    # Aggregated institutional KPIs
│   ├── studentRoutes.js      # Student admissions, search & dossier
│   ├── facultyRoutes.js      # Faculty staff & teaching load
│   ├── academicRoutes.js     # Departments, degree courses & subjects
│   ├── attendanceRoutes.js   # Class-sheet marking & attendance analytics
│   ├── examRoutes.js         # Exam schedules, marks entry & CGPA transcript
│   ├── feeRoutes.js          # Invoicing, payment receipts & collection metrics
│   ├── timetableRoutes.js    # Weekly class schedule grids
│   └── noticeRoutes.js       # Campus announcements & circulars
├── utils/
│   └── security.js           # PBKDF2 password hashing & token signing
├── test/
│   └── api.test.js           # Automated end-to-end API verification suite
└── public/                   # Client SPA (Responsive on Mobile/Tablet/Desktop)
    ├── index.html            # Application shell
    ├── css/style.css         # Styling, glassmorphism & print stylesheet
    └── js/
        ├── api.js            # API client wrapper & toast notifications
        ├── state.js          # Client session store
        ├── app.js            # Router & persona switcher
        └── components/       # Dynamic views
            ├── dashboardView.js
            ├── studentsView.js
            ├── facultyView.js
            ├── academicsView.js
            ├── attendanceView.js
            ├── examsView.js
            ├── feesView.js
            ├── timetableView.js
            └── noticesView.js
```

---

## 📊 Key Performance Indicators (KPIs)

### 1. Academic & Institutional KPIs
* **Attendance Compliance Index**: Real-time tracking of students maintaining $\ge 75\%$ mandatory attendance threshold with early warning alerts.
* **Academic Pass & Distinction Rate**: Cumulative Grade Point Average (CGPA scale 10.0) computation with distinction distribution.
* **Fee Realization Efficiency**: Ratio of tuition fees collected vs total invoiced fees.
* **Faculty-to-Student Ratio (FSR)**: Accreditation compliance metric.

### 2. Technical & Deployment KPIs
* **Zero External Dependencies**: Single container / process with embedded relational storage.
* **Cold Start Latency**: $< 500\text{ ms}$.
* **Cross-Device Adaptability**: 100% responsive on Mobile ($320\text{px}+$ viewport) up to 4K displays.
* **Public URL Readiness**: Automatic port binding (`process.env.PORT`) compatible with any cloud PAAS.

---

## 🚀 Quick Start (Local)

1. **Start the Application**:
   ```bash
   npm start
   ```
2. **Access in Browser**:
   Open [http://localhost:3000](http://localhost:3000)

3. **Run Automated Test Suite**:
   ```bash
   npm test
   ```

---

## 🔐 Default Demo Accounts

| Role | Username | Password | Key Capabilities |
| :--- | :--- | :--- | :--- |
| **👑 Admin** | `admin` | `Admin@123` | Institutional KPIs, Student/Faculty admissions, Fees, Departments |
| **👨‍🏫 Faculty** | `elena.rostova` | `Faculty@123` | Mark lecture attendance, Submit exam grades, View timetable |
| **🎓 Student** | `alex.johnson` | `Student@123` | Personal attendance stats, View marks & CGPA transcript, Fees |

---

## 🌐 Deploying to Get a Public URL

### Option 1: Render.com (1-Click)
1. Push this repository to GitHub.
2. Link the repository on [Render.com](https://render.com).
3. Render automatically picks up `render.yaml` and deploys your public URL (e.g. `https://your-college.onrender.com`).

### Option 2: Railway.app (1-Click)
1. Install Railway CLI or connect GitHub on [Railway.app](https://railway.app).
2. Railway detects the `server.js` and `railway.json` to deploy a live public HTTPS URL.

### Option 3: Docker Container
```bash
docker build -t college-management-system .
docker run -p 3000:3000 college-management-system
```
