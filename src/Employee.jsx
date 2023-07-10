import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeItem from './EmployeeItem';

const Employee = () => {
  const [employeeItems, setEmployeeItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = (item) => {
    if (editIndex !== null) {
      const updatedItems = [...employeeItems];
      updatedItems[editIndex] = item;
      setEmployeeItems(updatedItems);
      setEditIndex(null);
    } else {
      setEmployeeItems([...employeeItems, item]);
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
        employee={employeeItems[editIndex]}
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
