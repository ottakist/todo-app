import axios from 'axios'
interface Todo {
  id: number
  title: string
  completed: boolean
}

const API_URL = 'https://jsonplaceholder.typicode.com/todos'

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await axios.get<Todo[]>(`${API_URL}?_limit=10`)
  return res.data
}

export const createTodo = async (title: string): Promise<Todo> => {
  const res = await axios.post<Todo>(API_URL, { title, completed: false })
  return res.data
}

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`)
}

export const toggleTodo = async (id: number): Promise<void> => {
  const response = await fetch(`/api/todos/${id}/toggle`, {
    method: 'PATCH'
  })
  if (!response.ok) {
    throw new Error('Failed to toggle todo')
  }
}
