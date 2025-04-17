'use client'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import TodoItem from '../app/components/TodoItem'

interface Todo {
  id: number
  title: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const title = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get<Todo[]>(
          'https://jsonplaceholder.typicode.com/todos?_limit=10'
        )
        setTodos(res.data)
      } catch (err) {
        console.error('Error fetching todos:', err)
      }
    }

    fetchTodos()
  }, [])

  const createTodo = async (title: string) => {
    try {
      const res = await axios.post<Todo>(
        'https://jsonplaceholder.typicode.com/todos',
        {
          title,
          completed: false
        }
      )
      setTodos([...todos, res.data])
    } catch (err) {
      console.error('Error creating todo:', err)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (err) {
      console.error('Error deleting todo:', err)
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
    <section
      className='mx-auto mt-12 w-[90vw] max-w-[35rem]'
      onSubmit={handleSubmit}
    >
      <form className='mb-6 text-center'>
        <h3 className='mb-4 text-center text-4xl font-bold'>Todo List</h3>
        <div className='flex items-center'>
          <input
            ref={title}
            className='flex-1 rounded rounded-r-none border border-transparent bg-gray-100 p-1 pl-4 text-base text-gray-600'
            type='text'
            placeholder='Type the task'
          />
          <button
            type='submit'
            className='grid w-20 flex-0 items-center rounded-l-none rounded-r border-0 bg-blue-400 px-4 py-2 text-sm tracking-wider text-white capitalize transition hover:bg-blue-600'
          >
            Submit
          </button>
        </div>
      </form>

      <div className='grocery-container mt-8'>
        <ul className='list-none p-0'>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
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
