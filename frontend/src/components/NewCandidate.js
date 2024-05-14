// NewCandidate.js
import React, { useState } from "react";
import axios from "axios";
import "./style.css"; // Import the CSS file
import { Link } from "react-router-dom";

const NewCandidate = ({ user }) => {
  // State variables to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    salary: "",
    experience: "",
    address: "",
    position: "",
    joiningDate: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend API with form data
      const response = await axios.post(
        "http://localhost:3002/api/candidates",
        formData
      );
      console.log("Response:", response.data);
      // Reset form data after successful submission
      setFormData({
        name: "",
        email: "",
        age: "",
        salary: "",
        experience: "",
        address: "",
        position: "",
        joiningDate: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (user && user?.other?.isAdmin) {
    return (
      <div className="form-container2">
        <Link to="/">
          <div>
            <img
              height="50px"
              src="https://t3.ftcdn.net/jpg/02/61/48/34/360_F_261483479_7aE3sYTp46fwaJm3UMWYH7GSXEHAIzXG.jpg"
            ></img>
          </div>
        </Link>
        <h2>New Candidate Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="form-group2">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group2">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group2">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group2">
            <label>Salary:</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group2">
            <label>Experience:</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group2">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group2">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group2">
            <label>Joining Date:</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Submit Button */}
          <div className="form-group2">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="form2">
        <Link to="/">
          <div className="">
            <img
              height="50px"
              src="https://t3.ftcdn.net/jpg/02/61/48/34/360_F_261483479_7aE3sYTp46fwaJm3UMWYH7GSXEHAIzXG.jpg"
            ></img>
          </div>
        </Link>
        <div>Only HR/Admin has access to this page</div>
      </div>
    );
  }
};

export default NewCandidate;
