import React, { useEffect, useState, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../utils/axios';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import ExportToExcel from "./Export";

export default function SearchBar() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    date: '',
    amount: '',
  });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page = 1, searchQuery = '') => {
  try {
    const response = await api.get(`/expenses/?page=${page}&search=${encodeURIComponent(searchQuery)}`);
    setData(response.data.results.data);
    setTotalPages(Math.ceil(response.data.count / 10));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  useEffect(() => {
  fetchData(currentPage, search);
}, [currentPage, search]);


  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/expenses/${id}/`, { withCredentials: true });
      if (res.status === 204) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      category: item.category,
      description: item.description,
      date: item.date,
      amount: item.amount,
    });
    setEditId(item.id);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setFormData({ category: '', description: '', date: '', amount: '' });
    setEditId(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({ category: '', description: '', date: '', amount: '' });
    setEditId(null);
    setIsEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditMode) {
        res = await api.put(`/expenses/${editId}/`, formData, { withCredentials: true });
        if (res.status === 200) {
          fetchData(currentPage); // refresh current page
        }
      } else {
        res = await api.post('/expenses/', formData, { withCredentials: true });
        if (res.status === 201) {
          fetchData(currentPage);
        }
      }
      handleModalClose();
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };


  return (
    <div className="App">
      <Container fluid className="px-4">
        <ExportToExcel className='w-100' />
        <header className="mt-2 my-4 fs-3 fw-bold">
          All Expenses
          <Button className="ms-3 mb-2" onClick={handleAddClick}>
            Add Expense
          </Button>
        </header>

        <Form>
          <InputGroup className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
          </InputGroup>
        </Form>

        <Table striped bordered hover responsive style={{ minWidth: '1000px' }}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                <td>
                  <button onClick={() => handleEdit(item)} className="btn btn-outline-primary btn-sm">
                    <FaRegEdit />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-outline-danger btn-sm">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center gap-2 my-4">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>

        {/* Modal */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditMode ? 'Edit Expense' : 'Add Expense'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {isEditMode ? 'Update' : 'Add'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
