const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 🔥 ADD THIS
app.use(cors({
    origin: [
      'http://localhost:5173',   // React local
      'https://your-frontend.onrender.com' // deployed frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));
app.use("/api/notification", require("./routes/notificationRoutes"));
app.use("/api/leave", require("./routes/leaveRoutes"));
app.use("/api/payslip", require("./routes/payslipRoutes"));

module.exports = app;


