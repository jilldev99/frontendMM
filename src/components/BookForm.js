import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../api/api";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook({ title, author });
      setTitle("");
      setAuthor("");
      alert("Book added successfully");
      navigate("/books");
    } catch (error) {
      alert("Failed to add book");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "650px" }}>
        <h2 className="text-center mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            {" "}
            <button type="submit" className="btn btn-primary">
              Add Book
            </button>
            <button
              className="btn btn-secondary "
              onClick={() => navigate("/books")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
