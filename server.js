
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const protect = require('./middleware/auth');
const connectToDB = require('./config/dbConnect');
const register = require('./controllers/register');
const loginUser = require('./controllers/login');
const addNewTask = require('./controllers/add-new-task');
const sendTaskDetails = require('./controllers/showTaskDetails');
const updateTask = require("./controllers/updateTask");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB();

const allowedOrigins = [
  "https://siretrex.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.post("/register", register);
app.post("/login", loginUser);
app.post("/addtask", addNewTask);
app.post("/task/details", sendTaskDetails);
app.post("/task/update", updateTask);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
