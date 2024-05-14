// DailyAttendance.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const DailyAttendance = ({ user }) => {
  const [candidates, setCandidates] = useState([]);
  const [inTime, setInTime] = useState({});
  const [outTime, setOutTime] = useState({});
  const [markedAsInTime, setMarkedAsInTime] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/candidates"
        );
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchData();
  }, []);

  const markAsInTime = (id) => {
    const currentTime = new Date().toLocaleString();
    setInTime((prevInTime) => ({
      ...prevInTime,
      [id]: currentTime,
    }));
    setMarkedAsInTime((prevMarked) => ({
      ...prevMarked,
      [id]: true,
    }));
  };

  const markAsOutTime = (id) => {
    const currentTime = new Date().toLocaleString();
    setOutTime((prevOutTime) => ({
      ...prevOutTime,
      [id]: currentTime,
    }));
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-heading">Daily Attendance</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>In-Time</th>
            <th>Out-Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{inTime[candidate._id]}</td>
              <td>
                {markedAsInTime[candidate._id] ? outTime[candidate._id] : ""}
              </td>
              <td className="attendance-actions">
                {!markedAsInTime[candidate._id] ? (
                  <button onClick={() => markAsInTime(candidate._id)}>
                    Mark In-Time
                  </button>
                ) : (
                  <button onClick={() => markAsOutTime(candidate._id)}>
                    Out-Time
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyAttendance;
