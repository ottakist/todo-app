import React from 'react'

interface TodoItemProps {
  todo: {
    id: number
    title: string
    completed: boolean
  }
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle }) => {
  return (
    <li className='flex items-center justify-between border-b border-gray-300 py-3 transition-colors hover:bg-gray-100'>
      <div className='flex items-center gap-3'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className='h-4 w-4 accent-blue-500'
        />
        <span
          className={`text-lg ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className='rounded bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 focus:outline-none'
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem
