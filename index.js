const express = require('express');
const cors = require('cors');
const connectionDB = require('./Connection/database');

const registerRoutes = require('./Routers/registerRoute');
const departmentRoutes = require('./Routers/departmentRoute');
const subjectRoutes = require('./Routers/subjectRoute');
const loginRoutes = require('./Routers/loginRoute');
const examRoutes = require('./Routers/examRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use(registerRoutes);
app.use(departmentRoutes);
app.use(subjectRoutes);
app.use(loginRoutes);
app.use(examRoutes);

connectionDB(); 

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
