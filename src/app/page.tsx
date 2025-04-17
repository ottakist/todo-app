'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
  fetchTodos,
  createTodo as createTodoAPI,
  deleteTodo as deleteTodoAPI
} from './api'
import TodoItem from '../app/components/TodoItem'

interface Todo {
  id: number
  title: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [error, setError] = useState<string | null>(null)
  const title = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await fetchTodos()
        setTodos(todos)
      } catch (err) {
        console.error('Error fetching todos:', err)
        setError('Failed to fetch todos. Please try again later.')
      }
    }

    loadTodos()
  }, [])

  const createTodo = async (title: string) => {
    try {
      const newTodo = await createTodoAPI(title)
      setTodos([...todos, newTodo])
    } catch (err) {
      console.error('Error creating todo:', err)
      setError('Failed to create todo. Please try again.')
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id)
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (err) {
      console.error('Error deleting todo:', err)
      setError('Failed to delete todo. Please try again.')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (title.current && title.current.value.trim()) {
      createTodo(title.current.value.trim())
      title.current.value = ''
    }
  }

  return (
    <section className='relative mx-auto flex h-screen max-w-2xl flex-col overflow-hidden rounded-2xl bg-white p-6 pb-0 shadow-lg md:h-[90vh] md:w-[90vw] md:border md:p-6'>
      {error && (
        <div className='mb-4 rounded bg-red-100 p-3 text-red-700'>{error}</div>
      )}
      <form
        className='sticky top-0 z-10 mb-4 border-b-2 border-gray-300 bg-white pt-2 pb-4'
        onSubmit={handleSubmit}
      >
        <h3 className='mb-6 text-center text-4xl font-extrabold text-gray-800'>
          📝 Todo List
        </h3>
        <div className='flex overflow-hidden rounded-lg border border-gray-300 shadow-sm'>
          <input
            ref={title}
            className='flex-1 px-4 py-2 text-gray-700 placeholder:text-gray-400 focus:outline-none'
            type='text'
            placeholder='Type your task here...'
          />
          <button
            type='submit'
            className='bg-blue-500 px-6 font-semibold text-white transition-colors hover:bg-blue-600'
          >
            Add
          </button>
        </div>
      </form>

      <div
        className={`flex-1 overflow-y-auto pr-2 transition-all duration-300 ${
          todos.length <= 0 ? 'max-h-0 opacity-0' : 'opacity-100'
        }`}
      >
        <ul className='list-none p-0'>
          {todos.map((todo) => (
            <TodoItem
              key={crypto.randomUUID()}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
