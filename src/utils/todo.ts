import { API_URL } from '../constants/const'
import { ITodo } from '../interface/Todo'

export const updateTodo = async (todoId: string, updates: Partial<ITodo>) => {
	try {
		await fetch(`${API_URL}/${todoId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...updates }),
		})
	} catch (error) {
		console.error('Error updating todo:', error)
	}
}

export const deleteTodo = async (todoId: string) => {
	try {
		await fetch(`${API_URL}/${todoId}`, {
			method: 'DELETE',
		})
	} catch (error) {
		console.error('Error deleting todo:', error)
	}
}
