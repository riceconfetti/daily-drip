<script lang="ts">
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'
	import * as Drawer from '$components/ui/drawer'
	dayjs.extend(utc)
	dayjs.extend(timezone)

	const init = {
		year: dayjs().year(),
		month: dayjs().month()
	}
	const Day_Headings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const columns = [
		'col-start-1',
		'col-start-2',
		'col-start-3',
		'col-start-4',
		'col-start-5',
		'col-start-6',
		'col-start-7'
	]

	let calendar = new Array(6)
	calendar.fill(new Array(7))

	for (let i = 0; i < dayjs().daysInMonth(); i++) {}

	function getDay(date) {
		return dayjs(new Date(init.year, init.month, date + 1)).day()
	}
</script>

<Drawer.Root class="md:hidden">
	<div class="w-full h-full p-2 flex flex-col gap-2">
		<h2 class="playfair-display-sc-bold text-xl text-black text-opacity-70">
			{dayjs().format('MMMM')}
		</h2>

		<div class="w-full grid grid-cols-7 justify-items-center">
			{#each Day_Headings as day}
				<h2 class=" crimson-text-regular text-2xs uppercase text-dark text-opacity-70">{day}</h2>
			{/each}
		</div>

		<div
			class="border border-dark border-opacity-30 w-full h-full grid grid-cols-7 divide-y divide-x divide-dark divide-opacity-30 border-collapse"
		>
			{#each { length: dayjs().daysInMonth() } as __, date}
				<div class={`${columns[getDay(date)]} p-2 text-sm border-collap`}>
					<Drawer.Trigger>{date + 1}</Drawer.Trigger>
				</div>
			{/each}
		</div>
	</div>
	<!-- <Drawer.Trigger>Open</Drawer.Trigger> -->
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
			<Drawer.Description>This action cannot be undone.</Drawer.Description>
		</Drawer.Header>
		<Drawer.Footer>
			<Drawer.Close>Cancel</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
