import React, { useState } from 'react';
import EmployeeItem from './EmployeeItem';
import Button from './Button';

const Employee = () => {
  // State variables
  const [employeeItems, setEmployeeItems] = useState([]); // Array to store employee items
  const [fullName, setFullName] = useState(''); // State for the full name input field
  const [email, setEmail] = useState(''); // State for the email input field
  const [description, setDescription] = useState(''); // State for the description input field
  const [editIndex, setEditIndex] = useState(null); // Index of the item being edited
  const [errorMessage, setErrorMessage] = useState(''); // Error message for form validation

  // Function to handle adding or updating an employee item
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

    if (editIndex !== null) {
      // If an edit is in progress, update the existing item
      const updatedItems = [...employeeItems];
      updatedItems[editIndex] = newItem;
      setEmployeeItems(updatedItems);
      setEditIndex(null);
    } else {
      // Otherwise, add a new item
      setEmployeeItems([...employeeItems, newItem]);
    }

    // Reset input field values
    setFullName('');
    setEmail('');
    setDescription('');
  };

  // Function to handle editing an employee item
  const handleEditItem = (index) => {
    const itemToEdit = employeeItems[index];
    setFullName(itemToEdit.fullName);
    setEmail(itemToEdit.email);
    setDescription(itemToEdit.description);
    setEditIndex(index);
  };

  // Function to handle deleting an employee item
  const handleDeleteItem = (index) => {
    const updatedItems = [...employeeItems];
    updatedItems.splice(index, 1);
    setEmployeeItems(updatedItems);
    setEditIndex(null);
  };

  // Function to validate the form
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

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Employee</h1>

      {/* Form for adding or updating an employee item */}
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
        <Button type="submit">
          {editIndex !== null ? 'Update Item' : 'Add Item'}
        </Button>
      </form>

      {/* Displaying the list of employee items */}
      <div className="flex flex-wrap -mx-2">
        {employeeItems.map((item, index) => (
          <div key={index} className="w-full px-2 mb-4">
            <EmployeeItem
              item={item}
              onEdit={() => handleEditItem(index)}
              onDelete={() => handleDeleteItem(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;
