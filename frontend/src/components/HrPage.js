import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

const HrPage = ({ user }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/candidates"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Function to handle feedback input change
  const handleFeedbackChange = (id, feedback) => {
    const updatedEmployees = employees.map((employee) =>
      employee._id === id ? { ...employee, feedback: feedback } : employee
    );
    setEmployees(updatedEmployees);
  };

  // Function to handle click on an employee name
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleUpdateEmployee = async () => {
    try {
      await axios.put(
        `http://localhost:3002/api/candidates/${selectedEmployee._id}`,
        selectedEmployee
      );
      setEmployees(
        employees.map((employee) =>
          employee._id === selectedEmployee._id ? selectedEmployee : employee
        )
      );
      setSelectedEmployee(null);
      console.log("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee({ ...selectedEmployee, [name]: value });
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/candidates/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      console.log("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  if (user && user.other.isAdmin) {
    return (
      <div className="hr-data">
        <Link to="/">
          <div className="">
            <img
              height="50px"
              src="https://t3.ftcdn.net/jpg/02/61/48/34/360_F_261483479_7aE3sYTp46fwaJm3UMWYH7GSXEHAIzXG.jpg"
              alt="HR Logo"
            />
          </div>
        </Link>
        <h2>HR Page</h2>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>
                  <input
                    type="text"
                    value={employee.feedback}
                    onChange={(e) =>
                      handleFeedbackChange(employee._id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedEmployee && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              <h3 className="employee-details">Edit Employee</h3>
              <p>
                Name:{" "}
                <input
                  type="text"
                  name="name"
                  value={selectedEmployee.name}
                  onChange={handleEditInputChange}
                />
              </p>
              <p>
                Email:{" "}
                <input
                  type="email"
                  name="email"
                  value={selectedEmployee.email}
                  onChange={handleEditInputChange}
                />
              </p>
              <p>
                Position:{" "}
                <input
                  type="text"
                  name="position"
                  value={selectedEmployee.position}
                  onChange={handleEditInputChange}
                />
              </p>
              {/* Add other fields for editing */}
              <button onClick={handleUpdateEmployee}>Update</button>
            </div>
          </div>
        )}
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

export default HrPage;
