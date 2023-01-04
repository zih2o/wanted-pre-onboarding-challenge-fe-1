import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

  return (
    <div>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            <p className="font-bold">{todo.title}</p>
            <p>{todo.content}</p>
            <p>
              {todo.createAt == todo.updatedAt
                ? todo.createdAt + '생성됨'
                : todo.updatedAt + '수정됨'}
            </p>
            <button className="bg-slate-500" onClick={() => handleOpen(todo)}>
              Update
            </button>
            <button
              className="bg-slate-500"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">title</label>
        <input
          id="title"
          className="bg-red-400"
          {...register('title', {
            required: true,
          })}
        />
        {errors.title && <p className="bg-red">제목을 입력해주세요.</p>}
        <label htmlFor="content">content</label>
        <input id="content" {...register('content', { required: true })} />
        {errors.password && <p>내용을 입력해주세요.</p>}
        <button className="bg-red-200">ADD</button>
      </form>
      {isOpen && (
        <UpdateModal todo={oldTodo} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
