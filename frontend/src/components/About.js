import React from "react";
import Header from "./Header";
import "./style.css";
const About = () => {
  return (
    <div>
      {/* <Header /> */}
      <div>
        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>
            Feel free to get in touch with us if you have any questions,
            feedback, or inquiries.
          </p>
          <div className="contact-info">
            <p>Email: contact@example.com</p>
            <p>Phone: 7020436001</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
