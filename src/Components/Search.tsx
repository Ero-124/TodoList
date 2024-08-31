import { useState } from 'react'
import { ITodo } from '../interface/Todo'

interface ISearchProps {
	todos: ITodo[]
	setFilteredTodos: (todos: ITodo[]) => void
}

const Search = ({ todos, setFilteredTodos }: ISearchProps) => {
	const [title, setTitle] = useState<string>('')

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setTitle(value)

		if (value === '') {
			setFilteredTodos(todos)
		} else {
			const filteredTodos = todos.filter(todo =>
				todo.title.toLowerCase().includes(value.toLowerCase())
			)
			setFilteredTodos(filteredTodos)
		}
	}

	return (
		<input
			className='text-black  bg-transparent  px-2 basis-full placeholder:text-[#858C80] '
			type='text'
			value={title}
			placeholder='Type text for search...'
			onChange={handleChange}
		/>
	)
}

export default Search
