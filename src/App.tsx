import { useState } from 'react';
import './App.css';
import { Todolist } from "./Todolist";
import { v1 } from 'uuid';

export type TaskType = {
	id: string
	title: string
	isDone: boolean

}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	// console.log(crypto.randomUUID());

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
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'Redux', isDone: false },
		{ id: v1(), title: 'Typescript', isDone: false },
		{ id: v1(), title: 'RTK query', isDone: false },
	])

	// const state = result[0]
	// const setState = result[1]
	const addTask = (title: string) => {
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false,
		}
		const newState = [newTask, ...tasks]
		setTasks(newState)
	}
	const removeTask = (taskId: string) => {
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
	const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
		// const task = tasks.find(t => t.id === taskId)
		// if (task) {
		// 	task.isDone = newIsDone
		// 	setTasks([...tasks])
		// }
		const newState = tasks.map(t => t.id === taskId ? { ...t, isDone: newIsDone } : t)
		setTasks(newState)
	}


	return (
		<div className="App">
			<Todolist
				title="What to learn"
				tasks={tasks}
				removeTask={removeTask}
				addTask={addTask}
				changeTaskStatus={changeTaskStatus}
			// addTask={addTask}
			// changeFilter={changeFilter}
			/>
		</div>
	);
}




export default App;
