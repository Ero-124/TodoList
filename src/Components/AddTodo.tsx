import { useState } from 'react'
import { API_URL } from '../constants/const'
import { ITodo } from '../interface/Todo'
import Button from '../Ui/Button'

interface IAddTodoProps {
	todos: ITodo[]
	setTodos: (todos: ITodo[]) => void
	setFilteredTodos: (todos: ITodo[]) => void
}

const AddTodo = ({ todos, setTodos, setFilteredTodos }: IAddTodoProps) => {
	const [newTitle, setNewTitle] = useState('')
	const [error, setError] = useState<string | null>(null)
	const handleAddTodo = async () => {
		if (newTitle.trim() === '') {
			setError('Title cannot be empty')
			return
		}
		const newTodo: ITodo = {
			id: Date.now().toString(),
			title: newTitle,
			completed: false,
			isImportant: false,
		}
		try {
			await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTodo),
			})
			const updatedTodos = [...todos, newTodo]
			setTodos(updatedTodos)
			setFilteredTodos(updatedTodos)
			setNewTitle('')
			setError(null)
		} catch (err) {
			setError('Failed to add todo')
		}
	}
	return (
		<div className='border border-[#b2b2b2] flex text-white justify-between  overflow-hidden rounded-md mb-5 ml-2 mr-4 '>
			<input
				value={newTitle}
				onChange={e => setNewTitle(e.target.value)}
				type='text'
				placeholder='Item text...'
				className='text-black  bg-transparent  px-2 basis-full placeholder:text-[#858C80] '
			/>
			<Button
				text='Add item'
				cls='bg-[#24468A] py-2 px-4 text-nowrap'
				onClick={handleAddTodo}
			/>

			<div className='absolute bottom-14'>
				{error && <div className='text-red-500'>{error}</div>}
			</div>
		</div>
	)
}

export default AddTodo
