require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/dbConnect');
const register = require('./controllers/register');
const loginUser = require('./controllers/login');
const addNewTask = require('./controllers/add-new-task');
const sendTaskDetails = require('./controllers/showTaskDetails');
const updateTask = require('./controllers/updateTask');
const protect = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectToDB();

// Allowed origins
const allowedOrigins = [
  "https://chronotrex.netlify.app",
  "http://localhost:5173",
  "http://127.0.0.1:3000"
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow requests like Postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Auth & task routes
app.post("/register", register);
app.post("/login", loginUser);
app.post("/addtask", addNewTask);
app.post("/task/details", sendTaskDetails);
app.post("/task/update", updateTask);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
