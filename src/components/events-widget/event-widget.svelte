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
	class="overlay flex h-full w-full flex-col gap-2 transition md:flex-row lg:min-h-0 lg:flex-col lg:overflow-auto lg:p-4"
>
	<div class="flex w-full flex-col gap-2">
		<h2 class="playfair-display-semibold text-dark">Current Events</h2>
		{#each currentEvents as eventDetails}
			<EventSingle {eventDetails} {images} />
		{/each}
	</div>
	<div class="flex w-full flex-col gap-2">
		<h2 class="playfair-display-semibold text-dark">Upcoming Events</h2>
		{#each upcomingEvents as eventDetails}
			<EventSingle {eventDetails} {images} />
		{/each}
	</div>
</section>
