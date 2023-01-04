import React from 'react';
import { useForm } from 'react-hook-form';
import useTodo from '../hooks/useTodo';

export default function UpdateModal({ todo, onConfirm, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: { title: todo.title, content: todo.content } });

  const { updateTodo } = useTodo();

  const onSubmit = (data) => {
    updateTodo.mutate({ todo: data, todoId: todo.id });
    onClose();
  };

  return (
    <div className="flex items-center fixed z-10 w-full h-screen">
      <dialog className="flex fixed left-1/2 top-1/2 z-50 w-max h-60 border-none bg-slate-50 translate-y-[-50%] translate-x-[-50%] rounded-xl">
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
          <button className="bg-red-200">Update</button>
        </form>
      </dialog>
      <div
        onClick={() => onClose()}
        className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-25"
      ></div>
    </div>
  );
}
