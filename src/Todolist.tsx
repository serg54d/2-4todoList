import { FilterValuesType, TaskType } from "./App";
import { Button } from "./Button";
import { useState } from 'react';

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: number) => void
	// changeTodoListFilter: (nextFilter: FilterValuesType) => void
}


export const Todolist = ({ title, tasks, removeTask }: PropsType) => {


	// local state
	const [filiter, setFilter] = useState<FilterValuesType>('all')
	const changeTodoListFilter = (nextFilter: FilterValuesType) => {
		// debugger
		setFilter(nextFilter)
	}
	//  UI
	const getTasksForTodoList = (allTasks: Array<TaskType>, nextFilterValue: FilterValuesType) => {
		// debugger
		switch (nextFilterValue) {
			case 'active':
				return allTasks.filter(t => t.isDone === false);
			case 'completed':
				return allTasks.filter(t => t.isDone === true);
			default:
				return allTasks
		}
	}

	const tasksForTodoList = getTasksForTodoList(tasks, filiter)



	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input />
				<Button title={'+'} />
			</div>
			{
				tasksForTodoList.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasksForTodoList.map((task) => {
							const removeTaskHandler = () => { removeTask(task.id) }
							return (
								<li key={task.id}>
									<input type="checkbox"
										checked={task.isDone} />
									<span>{task.title}</span>
									<button onClick={removeTaskHandler}>x</button></li>
							)
						})}
					</ul>
			}
			<div>
				<button onClick={() => changeTodoListFilter('all')}>All</button>
				<button onClick={() => changeTodoListFilter('active')}>Active</button>
				<button onClick={() => changeTodoListFilter('completed')}>completed</button>
			</div>
		</div>
	)



}
