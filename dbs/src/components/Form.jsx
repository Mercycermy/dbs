import React, { useState } from "react";


const Form = () => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment Submitted:", comment);
    // Add API call here to submit the comment
  };

  return (
    <div className="comment-section">
      <h3>Post Comment</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={comment.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={comment.email}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={comment.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          rows="5"
          value={comment.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="comment-btn">Post Comment</button>
      </form>
    </div>
  );
};

export default Form;
