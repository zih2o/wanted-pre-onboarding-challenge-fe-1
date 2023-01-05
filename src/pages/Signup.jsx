import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { api } from '../utils/api';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const ref = useRef(null);
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      ref.current.disabled = false;
    } else {
      ref.current.disabled = true;
    }
    console.log(errors);
  }, [errors]);

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
      if (error.response.status === 409) {
        alert('이미 존재하는 이메일입니다.');
      }
    }
  };
  return (
    <div className="w-1/2 h-1/2 rounded-xl translate-x-[50%] translate-y-[50%] bg-slate-100 overflow-hidden shadow-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between items-center w-full h-full p-10"
      >
        <div className="flex flex-col items-center w-full">
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
        <div className="flex flex-col items-center w-full">
          <label htmlFor="pw" className="mb-2 text-slate-800 font-bold">
            PASSWORD
          </label>
          <input
            type="password"
            id="pw"
            {...register('password', { required: true, minLength: 8 })}
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">
              비밀번호는 8자 이상이어야 합니다.
            </p>
          )}
        </div>
        <div className="flex flex-col items-center w-full">
          <label htmlFor="cpw" className="mb-2 text-slate-800 font-bold">
            PASSWORD CONFIRM
          </label>
          <input
            type="password"
            id="cpw"
            {...register('cpassword', {
              required: true,
              validate: (val) => {
                if (watch('password') !== val) {
                  return '비밀번호가 일치하지 않습니다.';
                }
              },
            })}
            className="w-full"
          />
          {errors.cpassword && (
            <p className="text-red-600 text-sm">{errors.cpassword.message}</p>
          )}
        </div>
        <button ref={ref} className={'mt-4 px-4 py-2 w-full '}>
          Sign Up
        </button>
      </form>
      <Link to="/auth/login" className="fixed right-0 top-0 m-2">
        <button className=" bg-slate-600">LOG IN</button>
      </Link>
    </div>
  );
}
