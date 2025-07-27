import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddExp = () => {
  const [exp, setExp] = useState({
    imageUrl: '',
    title: '',
    amount: '',
    category: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setExp({
      ...exp,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/exp/add", exp)
      .then(() => {
        alert('Expense Added Successfully');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h4 className="mb-0">Add New Expense</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={exp.imageUrl}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="imageUrl">Image URL</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={exp.title}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="title">Title</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    placeholder="Amount"
                    value={exp.amount}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="amount">Amount</label>
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={exp.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Grocery">Grocery</option>
                  </select>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg">
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExp;
