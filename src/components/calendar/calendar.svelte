<script lang="ts">
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'
	import objectSupport from 'dayjs/plugin/objectSupport'
	import * as Drawer from '$components/ui/drawer'
	dayjs.extend(utc)
	dayjs.extend(timezone)
	dayjs.extend(objectSupport)

	const init = {
		year: dayjs().year(),
		month: dayjs().month(),
		day: 1
	}
	const Day_Headings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const weekDay = dayjs(init).day()
</script>

<Drawer.Root class="md:hidden">
	<div class="w-full h-full p-2 flex flex-col gap-2">
		<h2 class="playfair-display-sc-bold text-xl text-black text-opacity-70">
			{dayjs(init).format('MMMM')}
		</h2>

		<div class="w-full grid grid-cols-7 justify-items-center">
			{#each Day_Headings as day}
				<h2 class=" crimson-text-regular text-xs uppercase text-dark text-opacity-70">{day}</h2>
			{/each}
		</div>

		<div
			class="border border-dark border-opacity-30 w-full h-full grid grid-cols-7 divide-y divide-x"
		></div>
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
