const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Student = require("./models/Student");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/practical17")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Routes
app.get("/", async (req, res) => {
  const students = await Student.find();
  res.render("index", { students });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  try {
    const { name, age, course, email } = req.body;
    await Student.create({ name, age, course, email });
    res.redirect("/");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.get("/edit/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("edit", { student });
});

app.put("/edit/:id", async (req, res) => {
  try {
    const { name, age, course, email } = req.body;
    await Student.findByIdAndUpdate(req.params.id, { name, age, course, email });
    res.redirect("/");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
