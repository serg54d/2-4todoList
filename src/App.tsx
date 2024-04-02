import { useState } from 'react';
import './App.css';
import { Todolist } from "./Todolist";

export type TaskType = {
	id: number
	title: string
	isDone: boolean

}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	// const tasks: Array<TaskType> = [
	// 	{ id: 1, title: 'HTML&CSS', isDone: true },
	// 	{ id: 2, title: 'JS', isDone: true },
	// 	{ id: 3, title: 'ReactJS', isDone: false },
	// 	{ id: 4, title: 'Redux', isDone: false },
	// 	{ id: 5, title: 'Typescript', isDone: false },
	// 	{ id: 6, title: 'RTK query', isDone: false },
	// ]

	// const result = useState(tasks1)
	// console.log(result);

	// BLL:
	const todoListTitle = 'What to learn'
	// global state:
	const [tasks, setTasks] = useState<Array<TaskType>>([
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'ReactJS', isDone: false },
		{ id: 4, title: 'Redux', isDone: false },
		{ id: 5, title: 'Typescript', isDone: false },
		{ id: 6, title: 'RTK query', isDone: false },
	])

	// const state = result[0]
	// const setState = result[1]

	const removeTask = (taskId: number) => {
		// удалили таску из массива
		// передаем новый таск с изменениями
		// const newState = []
		// for (let i = 0; i < tasks.length; i++) {
		// 	if (tasks[i].id !== taskId) {
		// 		newState.push(tasks[i])
		// 	}
		// }
		setTasks(tasks.filter((task) => task.id !== taskId))
	}


	return (
		<div className="App">
			<Todolist
				title="What to learn"
				tasks={tasks}
				removeTask={removeTask}
			// changeFilter={changeFilter}
			/>
		</div>
	);
}




export default App;
