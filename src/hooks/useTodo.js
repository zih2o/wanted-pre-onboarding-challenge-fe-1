import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';

export default function useTodo() {
  const queryClient = useQueryClient()

  const todoQuery = useQuery({ queryKey: ["todos"], queryFn: async () => api.get("/todos").then(res => res.data) })

  const addTodo = useMutation({
    mutationFn: async (todo) => api.post("/todos", todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const updateTodo = useMutation({
    mutationFn: async ({ todo, todoId }) => api.put(`/todos/${todoId}`, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const removeTodo = useMutation({
    mutationFn: async (todoId) => api.delete(`/todos/${todoId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return { todoQuery, addTodo, updateTodo, removeTodo }
}