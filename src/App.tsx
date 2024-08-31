import { useEffect, useState } from 'react'
import AddTodo from './Components/AddTodo'
import DoneAndImortant from './Components/DoneAndImortant'
import Filter from './Components/Filter'
import Search from './Components/Search'
import TodoItem from './Components/TodoItem'
import { API_URL } from './constants/const'
import { ITodo } from './interface/Todo'

function App() {
	const [todos, setTodos] = useState<ITodo[]>([])
	const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [filter, setFilter] = useState<'all' | 'done' | 'important'>('all')

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const response = await fetch(API_URL)
				if (!response.ok) throw new Error('Network response was not ok')
				const data = await response.json()
				setTodos(data)
			} catch (error) {
				setError('Failed to fetch todos')
			} finally {
				setLoading(false)
			}
		}

		fetchTodos()
	}, [filter])

	useEffect(() => {
		const filtered = todos.filter(todo => {
			if (filter === 'done') return todo.completed
			if (filter === 'important') return todo.isImportant
			return true
		})
		setFilteredTodos(filtered)
	}, [todos, filter])

	const reversedFilteredTodos = [...filteredTodos].reverse()

	return (
		<div className='bg-[#ECECEC] h-screen pt-2'>
			<div className='max-w-[800px] mx-auto  bg-white  min-h-[95vh] rounded-md overflow-hidden'>
				{loading && <div>Loading...</div>}
				{error && <div>Error: {error}</div>}
				<DoneAndImortant filteredTodos={filteredTodos} />
				<div className='flex flex-col justify-between h-[75vh]'>
					<div className='py-2'>
						<div className='flex text-white border border-[#b2b2b2]  justify-between  overflow-hidden rounded-md mb-5 ml-2 mr-4'>
							<Search todos={todos} setFilteredTodos={setFilteredTodos} />
							<Filter setFilter={setFilter} />
						</div>
					</div>
					<div className='overflow-auto max-h-[600px]'>
						<ul>
							{reversedFilteredTodos.length > 0
								? reversedFilteredTodos.map(todo => (
										<TodoItem
											key={todo.id}
											todo={todo}
											todos={filteredTodos}
											setTodos={setTodos}
										/>
								  ))
								: 'No todos'}
						</ul>
					</div>
					<AddTodo
						todos={todos}
						setTodos={setTodos}
						setFilteredTodos={setFilteredTodos}
					/>
				</div>
			</div>
		</div>
	)
}

export default App
