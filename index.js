const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { urlencoded } = require("express");

const app = express();

require('dotenv').config()

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Create a mobile schema and model
const mobileSchema = new mongoose.Schema({
  title: String,
  description: String
});
const Mobile = mongoose.model('Mobile', mobileSchema);

// Middleware
app.use(urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.status(200).json({Message: "APIs at your service!"})
})

app.get('/mobiles', async (req, res) => {
  const mobiles = await Mobile.find({});
  res.json(mobiles);
});

app.post('/mobiles', async (req, res) => {
  const { title, description } = req.body;
  console.log(title, description)
  const mobile = new Mobile({ title, description });
  await mobile.save();
  res.json(mobile);
});

app.delete('/mobiles/:id', async (req, res) => {
  const { id } = req.params;
  await Mobile.findByIdAndDelete(id);
  res.json({ message: 'Mobile deleted successfully' });
});

const Port = process.env.PORT || 9001
// Start the server
app.listen(Port, () => {
  console.log(`Server started on port ${Port}`);
});
