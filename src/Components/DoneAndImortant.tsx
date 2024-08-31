import { ITodo } from '../interface/Todo'

const DoneAndImortant = ({ filteredTodos }: { filteredTodos: ITodo[] }) => {
	return (
		<div className='flex items-end gap-5 bg-[#373877]  p-8 text-white justify-center'>
			<h1 className='text-4xl uppercase font-bold'>My Todo List</h1>
			<div className=''>
				Done: {filteredTodos.filter(todo => todo.completed).length} Important:
				{filteredTodos.filter(todo => todo.isImportant).length}
			</div>
		</div>
	)
}

export default DoneAndImortant
