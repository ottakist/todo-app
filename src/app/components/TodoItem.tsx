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
    <li className='mb-3 flex items-center justify-between gap-4 rounded-xl border px-4 py-3 shadow-sm transition hover:shadow-md'>
      <div className='flex items-center gap-3'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className='h-5 w-5 text-blue-500 focus:ring-blue-400'
        />
        <span
          className={`text-base font-medium ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className='rounded-md bg-red-400 px-4 py-2 text-sm text-white shadow-sm transition hover:bg-red-600'
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem
