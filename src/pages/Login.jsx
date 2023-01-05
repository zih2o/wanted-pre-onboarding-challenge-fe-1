import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
    <div className="w-1/2 h-1/2 rounded-xl translate-x-[50%] translate-y-[50%] bg-slate-100 overflow-hidden shadow-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full p-10"
      >
        <div className="flex flex-col items-center">
          <label htmlFor="email" className="mb-2 text-slate-800 font-bold">
            E-MAIL
          </label>
          <input
            id="email"
            {...register('email', {
              required: true,
              pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
            })}
            className="w-full"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">이메일 형식이 맞지 않습니다.</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="pw" className="mb-2 text-slate-800 font-bold">
            PASSWORD
          </label>
          <input
            type="password"
            id="pw"
            {...register('password', { required: true })}
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">비밀번호를 입력해주세요.</p>
          )}
        </div>
        <button className="py-2">Log In</button>
      </form>

      <Link to="/auth/signup" className="fixed right-0 top-0 m-2">
        <button className=" bg-slate-600">SIGN UP</button>
      </Link>
    </div>
  );
}
