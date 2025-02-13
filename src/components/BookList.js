import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getBooks().then((res) => setBooks(res.data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-3">Book List</h2>
        <div>
          <button
            className="btn btn-primary mb-3 me-2"
            onClick={() => navigate("/add-book")}
          >
            Add Books
          </button>
          <button
            className="btn btn-danger mb-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
