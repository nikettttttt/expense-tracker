import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShowExp = () => {
  const [exp, setExp] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/exp/get/${id}`)
      .then((res) => setExp(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this expense?')) {
      axios.delete(`http://localhost:4000/exp/delete/${id}`)
        .then(() => navigate('/'))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg rounded-4 overflow-hidden">
            {exp.imageUrl && (
              <img
                src={exp.imageUrl}
                alt={exp.title}
                className="img-fluid w-100"
                style={{ height: '300px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h4 className="card-title mb-3 text-primary">{exp.title}</h4>
              <h5 className="text-success mb-2">Amount: ${exp.amount}</h5>
              <p className="mb-2"><strong>Category:</strong> {exp.category}</p>
              <p className="text-muted">
                <strong>Added on:</strong>{' '}
                {exp.createdAt && (
                  <>
                    {new Date(exp.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: 'numeric'
                    })}{' '}
                    at{' '}
                    {new Date(exp.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </>
                )}
              </p>

              <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
                <NavLink to="/" className="btn btn-secondary">
                  Go Back
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowExp;
