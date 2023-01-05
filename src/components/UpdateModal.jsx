import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useTodo from '../hooks/useTodo';

export default function UpdateModal({ todo, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: { title: todo.title, content: todo.content } });

  const { updateTodo } = useTodo();

  useEffect(() => {
    if (updateTodo.error && updateTodo.error.response.status === 400) {
      alert('로그인이 필요한 서비스입니다.');
      window.location.replace('/auth/login');
    }
  }, [updateTodo.error]);

  const onSubmit = (data) => {
    updateTodo.mutate({ todo: data, todoId: todo.id });
    onClose();
  };

  return (
    <div className="flex items-center fixed z-10 w-full h-screen">
      <dialog className="flex fixed left-1/2 top-1/2 z-50 w-72 h-72 p-4 border-none bg-slate-100 translate-y-[-50%] translate-x-[-50%] rounded-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full items-center"
        >
          <label htmlFor="title" className="text-slate-700">
            Title
          </label>
          <input
            id="title"
            {...register('title', {
              required: true,
            })}
          />
          {errors.title && (
            <p className="text-red-600 text-sm">제목을 입력해주세요.</p>
          )}
          <label htmlFor="content" className="mt-2 text-slate-700">
            Content
          </label>
          <input
            id="content"
            {...register('content', { required: true })}
            className="flex-auto overflow-y-scroll"
          />
          {errors.content && (
            <p className="text-red-600 text-sm">내용을 입력해주세요.</p>
          )}
          <button className="mt-4">Update</button>
        </form>
      </dialog>
      <div
        onClick={() => onClose()}
        className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-25"
      ></div>
    </div>
  );
}
