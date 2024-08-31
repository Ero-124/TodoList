import { useState } from 'react'
import CheckIcon from '../Icons/CheckIcon'
import DeleteIcon from '../Icons/DeleteIcon'
import EditIcon from '../Icons/EditIcon'
import ImportantIcon from '../Icons/ImportantIcon'
import { ITodo } from '../interface/Todo'
import { deleteTodo, updateTodo } from '../utils/todo'

interface ITodoItemProps {
	todo: ITodo
	todos: ITodo[]
	setTodos(todos: ITodo[]): void
}

const TodoItem = ({ todos, todo, setTodos }: ITodoItemProps) => {
	const [editTodo, setEditTodo] = useState(false)
	const [editTodoItem, setEditTodoItem] = useState('')

	const handleEdit = () => {
		setEditTodo(true)
		setEditTodoItem(todo.title)
	}

	const handleChangeTitle = async () => {
		await updateTodo(todo.id, { title: editTodoItem })
		setEditTodo(false)
		setEditTodoItem('')
		setTodos(
			todos.map(t => (t.id === todo.id ? { ...t, title: editTodoItem } : t))
		)
	}

	const handleToggle = async (key: keyof ITodo) => {
		const newValue = !todo[key]
		await updateTodo(todo.id, { [key]: newValue })
		setTodos(todos.map(t => (t.id === todo.id ? { ...t, [key]: newValue } : t)))
	}

	const handleDelete = async () => {
		await deleteTodo(todo.id)
		setTodos(todos.filter(t => t.id !== todo.id))
	}

	return (
		<li className='flex items-center gap-2 justify-between border-t border-[#b2b2b2] py-1 last:border-b'>
			{editTodo ? (
				<input
					type='text'
					value={editTodoItem}
					onChange={e => setEditTodoItem(e.target.value)}
					className={`px-2  font-medium w-full`}
				/>
			) : (
				<span
					className={`px-2  font-medium ${
						todo.completed && todo.isImportant
							? 'line-through text-red-500'
							: todo.completed
							? 'line-through text-[#b2b2b2]'
							: todo.isImportant
							? 'text-red-500 '
							: 'text-black'
					}`}
				>
					{todo.title}
				</span>
			)}

			<div className='flex gap-2 pr-2'>
				{!editTodo ? (
					<>
						<div onClick={handleEdit}>
							<EditIcon />
						</div>
						<div onClick={() => handleToggle('completed')}>
							<CheckIcon />
						</div>
						<div onClick={() => handleToggle('isImportant')}>
							<ImportantIcon />
						</div>
						<div onClick={handleDelete}>
							<DeleteIcon />
						</div>
					</>
				) : (
					<button
						className='bg-green-600 py-2 px-4 text-white rounded-md'
						onClick={handleChangeTitle}
					>
						Save
					</button>
				)}
			</div>
		</li>
	)
}

export default TodoItem
