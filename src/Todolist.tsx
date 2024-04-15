import { FilterValuesType, TaskType } from "./App";
import { Button } from "./Button";
import { ChangeEvent, useRef, useState, KeyboardEvent } from 'react';

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	addTask: (title: string) => void
	// changeTodoListFilter: (nextFilter: FilterValuesType) => void
	changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}


export const Todolist = ({ title, tasks, removeTask, addTask, changeTaskStatus }: PropsType) => {


	// local state
	const [filter, setFilter] = useState<FilterValuesType>('all')
	const [taskTitle, setTaskTitle] = useState('')

	const [taskInputError, setTaskInputError] = useState<string | null>(null)

	const isTitleTooLong = taskTitle.length >= 15
	const ifTaskCanAdded = taskTitle && !isTitleTooLong

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

	const tasksForTodoList = getTasksForTodoList(tasks, filter)

	// const addTask = () => { () => alert('New task') }


	const onCLickHandlerCreator = (filter: FilterValuesType) => {
		return () => changeTodoListFilter(filter)
	}
	const onClickAddTaskHandler = () => {
		const trimmedTaskTitle = taskTitle.trim()
		if (trimmedTaskTitle) {
			addTask(trimmedTaskTitle)

		} else {
			setTaskInputError('Title is required')
		}
		setTaskTitle('')
	}

	const onChangeSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value)
		setTaskInputError(null)
	}
	const onKeyDownAddTaskHanlder = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && ifTaskCanAdded) {
			onClickAddTaskHandler()
		}
	}

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input
					className={!!taskInputError ? "task-input-error" : ""}
					value={taskTitle}
					onChange={onChangeSetTaskTitle}
					onKeyDown={onKeyDownAddTaskHanlder}
				/>

				<button disabled={!ifTaskCanAdded} onClick={onClickAddTaskHandler}>+</button>
				{isTitleTooLong && <div>Your task title is to long</div>}
				{!!taskInputError && <div className="task-input-error-message">{taskInputError}</div>}
			</div>
			{
				tasksForTodoList.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasksForTodoList.map((task) => {
							const onClickRemoveTaskHandler = () => { removeTask(task.id) }
							const onChangeSetTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { changeTaskStatus(task.id, e.currentTarget.checked) }
							return (
								<li key={task.id}>
									<input type="checkbox"
										checked={task.isDone}
										onChange={onChangeSetTaskStatusHandler} />
									<span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
									<button onClick={onClickRemoveTaskHandler}>x</button></li>
							)
						})}
					</ul>
			}
			<div>
				<button className={filter === 'all' ? 'filter-btn-active' : ''} onClick={onCLickHandlerCreator('all')}>All</button>
				<button className={filter === 'active' ? 'filter-btn-active' : ''} onClick={onCLickHandlerCreator('active')}>Active</button>
				<button className={filter === 'completed' ? 'filter-btn-active' : ''} onClick={onCLickHandlerCreator('completed')}>completed</button>
			</div>
		</div>
	)



}
