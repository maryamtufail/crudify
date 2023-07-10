import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeItem from './EmployeeItem';

const Employee = () => {
  const [employeeItems, setEmployeeItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = (newItem) => {
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
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...employeeItems];
    updatedItems.splice(index, 1);
    setEmployeeItems(updatedItems);
    setEditIndex(null);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Employee</h1>
      <EmployeeForm
        onAddItem={handleAddItem}
        editIndex={editIndex}
        employee={editIndex !== null ? employeeItems[editIndex] : null}
      />
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
