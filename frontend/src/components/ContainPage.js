// ContainPage.js
import React from "react";

const ContainPage = () => {
  return (
    <div className="container">
      {/* <h2>Key Features of Our HRMS System</h2> */}
      <div className="feature">
        <h3>User Authentication and Authorization</h3>
        <p>Secure login system with role-based access control.</p>
      </div>
      <div className="feature">
        <h3>Employee Profiles</h3>
        <p>Personalized profiles with essential information and job details.</p>
      </div>
      <div className="feature">
        <h3>Attendance Management</h3>
        <p>Track attendance, manage leave requests, and generate reports.</p>
      </div>
      <div className="feature">
        <h3>Recruitment and Onboarding</h3>
        <p>
          Post job vacancies, manage applications, and streamline onboarding.
        </p>
      </div>
      <div className="feature">
        <h3>Performance Management</h3>
        <p>Conduct performance reviews, set goals, and provide feedback.</p>
      </div>

      <div className="feature">
        <h3>Analytics and Reporting</h3>
        <p>Generate insights, analytics, and customizable reports.</p>
      </div>
      <div className="feature">
        <h3>Compliance and Regulations</h3>
        <p>Ensure compliance with laws, regulations, and industry standards.</p>
      </div>
      <div className="feature">
        <h3>Mobile Accessibility</h3>
        <p>
          Access HRMS features anytime, anywhere with mobile-friendly design.
        </p>
      </div>
    </div>
  );
};

export default ContainPage;
