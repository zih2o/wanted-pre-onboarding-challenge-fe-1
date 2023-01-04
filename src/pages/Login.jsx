import React from 'react';
import { useForm } from 'react-hook-form';
import { redirect } from 'react-router-dom';
import { api } from '../utils/api';

export default function Login() {
  const token = localStorage.getItem('token');
  if (token) window.location.replace('/');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await api.post('/users/login', {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem('token', response.data.token);
      alert(response.data.message);
      window.location.replace('/');
    } catch (error) {
      if (error.response.status === 400) {
        alert('아이디나 비밀번호가 일치하지 않습니다.');
        return;
      }
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="bg-red-400"
        {...register('email', {
          required: true,
          pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
        })}
      />
      {errors.email && <p className="bg-red">이메일 형식이 맞지 않습니다.</p>}
      <input type="password" {...register('password', { required: true })} />
      {errors.password && <p>비밀번호를 입력해주세요.</p>}
      <button className="bg-red-200">Log In</button>
    </form>
  );
}
