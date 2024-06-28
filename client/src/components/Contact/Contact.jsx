import React, { useState } from "react";
import "./Contact.css";
import axios from "axios";
const ContactForm = () => {
  const [firstname, setFirstname] = useState("");
  const url = "https://site-backend-ndps.onrender.com/api/send-email";
  const [secondname, setSecondname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await axios.post(url, {
        firstname,
        secondname,
        email,
        message,
      });
      setFirstname("");
      setSecondname("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setErr(error.response.data.msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
    // Handle form submission logic here
  };
  const cos = loading ? "not-allowed" : "pointer";
  return (
    <div className="container">
      <h2>Contact Me</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          className="input"
          placeholder="First Name"
          required
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <input
          type="text"
          name="secondName"
          className="input"
          placeholder="Second Name"
          required
          value={secondname}
          onChange={(e) => {
            setSecondname(e.target.value);
          }}
        />
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <textarea
          name="message"
          className="textarea"
          placeholder="Your Message"
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit" className="button" style={{ cursor: cos }}>
          Submit
        </button>
        <div className="msg" style={{ color: "blue", alignSelf: "center" }}>
          {err}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
