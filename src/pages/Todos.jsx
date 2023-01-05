import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useTodo from '../hooks/useTodo';
import UpdateModal from '../components/UpdateModal';

export default function Todos() {
  const [isOpen, setIsOpen] = useState(false);
  const [oldTodo, setOldTodo] = useState({ title: '', content: '' });
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const {
    todoQuery: { data, error },
    addTodo,
    removeTodo,
  } = useTodo();

  const todos = data && data.data;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ title: '', content: '' });
    }
  }, [formState, reset]);

  useEffect(() => {
    if (error && error.response.status === 400) {
      alert('로그인이 필요한 서비스입니다.');
      window.location.replace('/auth/login');
    }
  }, [error]);

  const onSubmit = (data) => {
    addTodo.mutate(data);
  };

  const handleOpen = (todo) => {
    setIsOpen(true);
    setOldTodo(todo);
  };

  const handleDelete = (todoId) => {
    removeTodo.mutate(todoId);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.replace('/auth/login');
  };

  return (
    <div className="flex flex-col w-1/2 h-1/2 rounded-xl translate-x-[50%] translate-y-[50%] bg-slate-50 overflow-hidden shadow-xl">
      <ul className="flex-auto mx-5 my-5 overflow-y-scroll">
        {todos &&
          todos.map((todo) => (
            <li key={todo.id} className="mb-3 p-3 border-2 rounded-md">
              <p className="font-bold">{todo.title}</p>
              <p>{todo.content}</p>
              <div className="flex justify-between">
                <p>{todo.createdAt.split('.')[0].replace(/T/g, ' ')}</p>
                <div>
                  <button onClick={() => handleOpen(todo)}>Update</button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <div className="bg-gradient-to-r from-slate-500  to-slate-400">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between mx-5 my-5"
        >
          <div>
            <label htmlFor="title" className="text-sm text-slate-50 font-light">
              Title
            </label>
            <input
              id="title"
              {...register('title', {
                required: true,
              })}
              className="w-24"
            />
            {errors.title && <p className="bg-red">제목을 입력해주세요.</p>}
            <label htmlFor="content" className="text-slate-50">
              Content
            </label>
            <input
              id="content"
              {...register('content', { required: true })}
              className="w-96"
            />
            {errors.password && <p>내용을 입력해주세요.</p>}
          </div>
          <button className="">ADD</button>
        </form>
      </div>
      {isOpen && (
        <UpdateModal todo={oldTodo} onClose={() => setIsOpen(false)} />
      )}
      <button
        onClick={handleLogOut}
        className="fixed right-0 top-0 m-2 bg-slate-600"
      >
        LOG OUT
      </button>
    </div>
  );
}
