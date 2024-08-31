interface IButtonProps {
	text: string
	cls: string
	onClick: () => void
}
const Button = ({ onClick, text, cls }: IButtonProps) => {
	return (
		<button className={`py-1 px-4 ${cls}`} onClick={onClick}>
			{text}
		</button>
	)
}

export default Button
