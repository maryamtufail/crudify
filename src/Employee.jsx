import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import Button from './Button' 
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
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Employee</h1>

      <EmployeeForm
        onAddItem={handleAddItem}
        editIndex={editIndex}
        employee={employeeItems[editIndex]}
      />

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeItems.map((item, index) => (
            <tr key={index}>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.salary}</td>
              <td className='flex gap-2 justify-center'>
                <Button name="Edit" onClick={() => handleEditItem(index)}/>
                <Button name="Delete" onClick={() => handleDeleteItem(index)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
