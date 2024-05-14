const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/user-schema");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://harshalg:jIUmTYRS86P0aD08@app.wen0ngb.mongodb.net/hrms"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found, please register" });
    }
    if (password !== user.password) {
      return res
        .status(404)
        .json({ message: " please enter correct password" });
    }
    const { password: pass, ...other } = user._doc;
    res.status(200).json({
      message: "succuss",
      other,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//
app.post("/reg", async (req, res) => {
  try {
    // console.log(req.body);
    const { signupData } = req.body;
    const newUser = await User.create({
      name: signupData.signupName,
      email: signupData.signupEmail,
      password: signupData.signupPassword,
      isAdmin: false,
    });
    res.status(200).json({ message: "oK", User: newUser });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

const Candidate = mongoose.model("Candidate", {
  name: String,
  email: String,
  age: Number,
  salary: String,
  experience: String,
  address: String,
  position: String,
  joiningDate: Date,
  presenty: { type: Boolean, default: false },
  feedback: { type: String, default: "" },
});
// Express route to handle new candidate data
app.post("/api/candidates", async (req, res) => {
  try {
    const {
      name,
      email,
      age,
      salary,
      experience,
      address,
      position,
      joiningDate,
      presenty,
      feedback,
    } = req.body;

    // Create a new candidate document
    const candidate = new Candidate({
      name,
      email,
      age,
      salary,
      experience,
      address,
      position,
      joiningDate,
      feedback,
      presenty,
    });

    // Save the candidate to the database
    await candidate.save();

    res.status(201).json({ message: "Candidate created successfully" });
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/candidates", async (req, res) => {
  try {
    // Fetch all candidates from the database
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/////////
// Edit Candidate Endpoint
app.put("/api/candidates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      age,
      salary,
      experience,
      address,
      position,
      joiningDate,
      presenty,
      feedback,
    } = req.body;

    // Find the candidate by ID
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Update the candidate properties
    candidate.name = name;
    candidate.email = email;
    candidate.age = age;
    candidate.salary = salary;
    candidate.experience = experience;
    candidate.address = address;
    candidate.position = position;
    candidate.joiningDate = joiningDate;
    candidate.presenty = presenty;
    candidate.feedback = feedback;

    // Save the updated candidate to the database
    await candidate.save();

    res.status(200).json({ message: "Candidate updated successfully" });
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Candidate Endpoint
app.delete("/api/candidates/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Candidate.findByIdAndDelete(id);

    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//////
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
