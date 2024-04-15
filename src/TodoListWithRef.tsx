import { FilterValuesType, TaskType } from "./App";
import { Button } from "./Button";
import { useRef, useState } from 'react';

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	addTask: (title: string) => void
	// changeTodoListFilter: (nextFilter: FilterValuesType) => void
}


export const Todolist = ({ title, tasks, removeTask, addTask }: PropsType) => {


	// local state
	const [filiter, setFilter] = useState<FilterValuesType>('all')
	const taskTitleInput = useRef<HTMLInputElement>(null)

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

	// const addTask = () => { () => alert('New task') }


	const onCLickHandlerCreator = (filter: FilterValuesType) => {
		return () => changeTodoListFilter(filiter)
	}
	const onClickAddTaskHandler = () => {
		if (taskTitleInput.current) {
			const newTaskTitle = taskTitleInput.current.value
			addTask(newTaskTitle)
			taskTitleInput.current.value = ''
		}

	}
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input ref={taskTitleInput} />
				{/* <Button onClick={() => alert('Привет')} title={'+'} /> */}
				<button onClick={onClickAddTaskHandler}>+</button>
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
				<button onClick={onCLickHandlerCreator('all')}>All</button>
				<button onClick={onCLickHandlerCreator('all')}>Active</button>
				<button onClick={onCLickHandlerCreator('all')}>completed</button>
			</div>
		</div>
	)



}
