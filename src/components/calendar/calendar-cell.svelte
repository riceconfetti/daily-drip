<script lang="ts">
	import dayjs from 'dayjs'

	const columns = [
		'col-start-7',
		'col-start-1',
		'col-start-2',
		'col-start-3',
		'col-start-4',
		'col-start-5',
		'col-start-6'
	]

	export let day, refDate
</script>

<div
	class={`${columns[day.day()]} p-2 crimson-text-regular ${dayjs().isSame(day, 'day') ? 'text-accent-light' : ''} ${day.month() != refDate.month() ? 'bg-dark bg-opacity-10' : ''}`}
>
	{day.date()}
</div>
