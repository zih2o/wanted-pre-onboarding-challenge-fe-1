import React from 'react';
import { useForm } from 'react-hook-form';

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: true,
          pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
        })}
      />
      <input {...register('password', { required: true, min: 8 })} />
      <input type="text" />
      <button>Sign Up</button>
    </form>
  );
}
