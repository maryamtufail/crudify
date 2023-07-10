import React from 'react';
import Button from './Button';

const EmployeeItem = ({ item, onEdit, onDelete }) => {
  return (
    <div className="border p-4 mb-4">
      <h3 className="">Full Name: {item.fullName}</h3>
      <p className="mb-2">Email: {item.email}</p>
      <p className="mb-4">Description: {item.description}</p>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default EmployeeItem;
