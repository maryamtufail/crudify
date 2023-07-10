import React, { useState, useEffect } from 'react';
import Button from './Button';

const EmployeeForm = ({ onAddItem, editIndex, employee }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (employee) {
      setFullName(employee.fullName);
      setEmail(employee.email);
      setDescription(employee.description);
    }
  }, [employee]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const newItem = {
      fullName,
      email,
      description,
    };

    onAddItem(newItem);

    setFullName('');
    setEmail('');
    setDescription('');
  };

  const validateForm = () => {
    if (fullName.trim() === '' || email.trim() === '' || description.trim() === '') {
      setErrorMessage('All fields are required');
      return false;
    }
    if (!validateEmail(email.trim())) {
      setErrorMessage('Invalid email format');
      return false;
    }
    if (description.trim().split(' ').length > 150) {
      setErrorMessage('Description should be maximum 150 words');
      return false;
    }
    if (!/^[A-Za-z]+$/.test(fullName.trim())) {
      setErrorMessage('Full name should contain alphabetic characters only');
      return false;
    }
    if (fullName.trim().length > 50) {
      setErrorMessage('Full name should not exceed 50 characters');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <form onSubmit={handleAddItem} className="mb-4">
      <input
        type="text"
        placeholder="First Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
        rows={6}
      />
      <p className="text-red-500">{errorMessage}</p>
      <Button type="submit">{editIndex !== null ? 'Update Item' : 'Add Item'}</Button>
    </form>
  );
};

export default EmployeeForm;
