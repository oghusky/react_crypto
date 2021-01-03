require("dotenv").config();
const express = require('express'),
  app = express(),
  path = require('path'),
  mongoose = require('mongoose'),
  PORT = process.env.PORT || 3001;


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("CONNECTED TO DB")
})

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({ extended: true }));

// initiate routes
const stockRoutes = require('./routes/stock-routes');
// use routes
app.use("/api", stockRoutes);

// test route
app.get("/config", (req, res) => {
  res.json({
    status: "SERVER WORKS"
  })
})

// index html route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
})

// listening port
app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT: ' + PORT);
})

