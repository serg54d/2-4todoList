type ButtonPropsType = {
	title: string
	changeFilter?: () => void
}

export const Button = (props: ButtonPropsType) => {
	const onClickHandler = () => {
		if (props.changeFilter) {
			props.changeFilter()
		}
	}

	return (
		<button>{props.title}</button>
	)
}
