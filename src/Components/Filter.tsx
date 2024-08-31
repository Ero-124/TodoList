import Button from '../Ui/Button'

const Filter = ({
	setFilter,
}: {
	setFilter: (filter: 'all' | 'done' | 'important') => void
}) => {
	return (
		<div className='flex'>
			<Button text='All' onClick={() => setFilter('all')} cls='bg-[#373877]' />
			<Button
				text='Done'
				onClick={() => setFilter('done')}
				cls='bg-[#257B2E]'
			/>
			<Button
				text='Imporant'
				onClick={() => setFilter('important')}
				cls='bg-[#A22725]'
			/>
		</div>
	)
}

export default Filter
