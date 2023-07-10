import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

const EmployeeForm = ({ onAddItem, editIndex, employee }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (employee) {
      setValue('fullName', employee.fullName);
      setValue('email', employee.email);
      setValue('description', employee.description);
    }
  }, [employee, setValue]);

  const onSubmit = (data) => {
    if (editIndex !== null) {
      const updatedItem = {
        fullName: data.fullName,
        email: data.email,
        description: data.description,
      };
      onAddItem(updatedItem);
    } else {
      const newItem = {
        fullName: data.fullName,
        email: data.email,
        description: data.description,
      };
      onAddItem(newItem);
    }

    reset(); // Reset the form fields
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <input
        type="text"
        placeholder="First Name"
        {...register('fullName', { required: true })}
        className="border p-2 w-full mb-2"
      />
      {errors.fullName && (
        <p className="text-red-500">Full Name is required</p>
      )}

      <input
        type="email"
        placeholder="Email"
        {...register('email', { required: true })}
        className="border p-2 w-full mb-2"
      />
      {errors.email && (
        <p className="text-red-500">Email is required</p>
      )}

      <textarea
        placeholder="Description"
        {...register('description', { required: true })}
        className="border p-2 w-full mb-2"
        rows={6}
      />
      {errors.description && (
        <p className="text-red-500">Description is required</p>
      )}

      <Button type="submit">
        {editIndex !== null ? 'Update Item' : 'Add Item'}
      </Button>
    </form>
  );
};

export default EmployeeForm;
