const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());
const cors = require('cors');
app.use(cors()); 


mongoose.connect('mongodb+srv://eslam:eslam123123@cluster0.rybkvnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



app.use("/api", authRoutes);
app.use("/api", taskRoutes);

const path = require('path');

// خليه يشوف ملفات static من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// لما يطلب /api، ابعتله ملف api.html
app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api.html'));
});




app.listen(PORT, () => {
  console.log('Server is running!');
});
