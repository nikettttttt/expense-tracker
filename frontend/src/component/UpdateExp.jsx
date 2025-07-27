import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateExp = () => {
  const [exp, setExp] = useState({
    imageUrl: '',
    title: '',
    amount: '',
    category: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/exp/get/${id}`)
      .then((res) => setExp(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setExp({
      ...exp,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/exp/update/${id}`, exp)
      .then(() => {
        alert('Expense Updated Successfully');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg rounded-4">
            <div className="card-header bg-warning text-dark text-center">
              <h4 className="mb-0">Update Expense</h4>
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
                    <option value="">-- Select Category --</option>
                    <option value="Misscellineous">Misscellineous</option>
                    <option value="Travelling">Travelling</option>
                    <option value="Grocery">Grocery</option>
                  </select>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg">
                    Update Expense
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

export default UpdateExp;
