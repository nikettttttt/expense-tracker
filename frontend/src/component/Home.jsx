import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [exps, setExps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/exp/get")
      .then((res) => setExps(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      axios.delete(`http://localhost:4000/exp/delete/${id}`)
        .then(() => {
          setExps(prev => prev.filter(exp => exp._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-primary">Total Expenses Data</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exps.map((exp) => (
              <tr key={exp._id}>
                <td>
                  <img
                    src={exp.imageUrl}
                    alt={exp.title}
                    className="img-thumbnail"
                    style={{ height: '80px', objectFit: 'cover' }}
                  />
                </td>
                <td>{exp.title}</td>
                <td>${exp.amount}</td>
                <td>{exp.category}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <NavLink to={`/update/${exp._id}`} className="btn btn-sm btn-warning">
                      Update
                    </NavLink>
                    <NavLink to={`/show/${exp._id}`} className="btn btn-sm btn-info text-white">
                      Read More
                    </NavLink>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(exp._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {exps.length === 0 && (
              <tr>
                <td colSpan="5" className="text-muted py-4">No expenses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
