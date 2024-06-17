<script lang="ts">
	import dayjs from 'dayjs'
	import EventSingle from './event-single.svelte'
	export let events, images

	$: currentEvents = events
		.filter((e) => {
			return dayjs(e.startDate) < dayjs() && dayjs(e.endDate) > dayjs()
		})
		.sort((a, b) => {
			return dayjs(a.startDate) < dayjs(b.startDate) ? -1 : 1
		})

	$: upcomingEvents = events
		.filter((e) => {
			return dayjs(e.startDate) > dayjs() && dayjs(e.startDate) < dayjs().add(4, 'w')
		})
		.sort((a, b) => {
			return dayjs(a.startDate) < dayjs(b.startDate) ? -1 : 1
		})
</script>

<section
	class="transition overlay lg:min-h-0 flex flex-col gap-2 w-full h-full md:flex-row lg:flex-col lg:overflow-auto lg:p-4"
>
	<div class="flex flex-col gap-2 w-full">
		<h2 class="playfair-display-semibold text-dark">Current Events</h2>
		{#each currentEvents as eventDetails}
			<EventSingle {eventDetails} {images} />
		{/each}
	</div>
	<div class="flex flex-col gap-2 w-full">
		<h2 class="playfair-display-semibold text-dark">Upcoming Events</h2>
		{#each upcomingEvents as eventDetails}
			<EventSingle {eventDetails} {images} />
		{/each}
	</div>
</section>
