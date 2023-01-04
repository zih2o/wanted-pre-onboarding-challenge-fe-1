import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../utils/api';

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await api.post('/users/create', {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem('token', response.data.token);
      alert(response.data.message);
      window.location.replace('/');
    } catch (error) {
      if (error.status === 409) {
        alert('이미 존재하는 이메일입니다.');
      }
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="bg-red"
        {...register('email', {
          required: true,
          pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
        })}
      />
      {errors.email && <p className="bg-red">이메일 형식이 맞지 않습니다.</p>}
      <input
        type="password"
        {...register('password', { required: true, minLength: 8 })}
      />
      {errors.password && <p>비밀번호는 8자 이상이어야 합니다.</p>}
      <input
        type="password"
        {...register('cpassword', {
          required: true,
          validate: (val) => {
            if (watch('password') !== val) {
              return '비밀번호가 일치하지 않습니다.';
            }
          },
        })}
      />
      {errors.cpassword && <p>{errors.cpassword.message}</p>}
      <button className="bg-red-200">Sign Up</button>
    </form>
  );
}
