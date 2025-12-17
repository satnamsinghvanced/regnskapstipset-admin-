require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 const routes = require("./src/api/routes") 
const cron = require("./service/cronJob")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://admin.regnskaptipset.no",
      "https://regnskaptipset.no"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use('/api', routes);

app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
  res.send('Node.js server is running ');
});
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log(`http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
