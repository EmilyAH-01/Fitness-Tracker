// Require npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// Declare port
const PORT = process.env.PORT || 8080;

// Will use /models/workout-model.js to set up schema
const db = require("./models/workout-model.js"); 

// Set up Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

// Use html, css, js in public folder
app.use(express.static("public"));

// Require routes
app.use(require("./routes/html-routes.js"));
app.use(require("./routes/api-routes.js"));

// Start mongoose connection- middleman between Node JS and MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useFindAndModify: false
});

app.listen(PORT, () => {
    console.log("App running on port " + PORT);
});

