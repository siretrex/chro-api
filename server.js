require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const protect = require('./middleware/auth');
const connectToDB = require('./config/dbConnect');
const register = require('./controllers/register')
const loginUser = require('./controllers/login')
const addNewTask = require('./controllers/add-new-task')
const sendTaskDetails = require('./controllers/showTaskDetails')
const updateTask = require("./controllers/updateTask")


const app = express();
const PORT = process.env.PORT || 3000;

connectToDB();
app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});


app.post("/register", register)
app.post("/login", loginUser)
app.post("/addtask", addNewTask)
app.post("/task/details", sendTaskDetails)
app.post("/task/update", updateTask)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
