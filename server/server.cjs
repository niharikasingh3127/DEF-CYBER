// server/server.cjs
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// 1. CONNECT TO MONGODB
// I added '/defence_db' to the URI below to force a specific database name
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Securely'))
  .catch(err => console.error('❌ DB Connection Error:', err));

const IncidentSchema = new mongoose.Schema({
  type: String,
  source: String,
  riskScore: Number,
  status: { type: String, default: 'DETECTED' },
  timestamp: { type: Date, default: Date.now }
});

const Incident = mongoose.model('Incident', IncidentSchema);

// GET ROUTES
app.get('/api/incidents', async (req, res) => {
  const count = await Incident.countDocuments();
  console.log(`📥 GET Request: Fetching ${count} incidents for Dashboard`);
  const incidents = await Incident.find().sort({ timestamp: -1 });
  res.json(incidents);
});

// POST ROUTES
app.post('/api/incidents', async (req, res) => {
  console.log("⚡ INCOMING DATA:", req.body); // Step 1: See if data reaches server

  try {
    const newIncident = new Incident(req.body);
    const savedData = await newIncident.save();
    console.log("💾 SAVED TO DB:", savedData); // Step 2: Confirm MongoDB accepted it
    res.json(savedData);
  } catch (err) {
    console.error("❌ SAVE FAILED:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))