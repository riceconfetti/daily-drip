<script lang="ts">
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'
	export let version, game

	dayjs.extend(utc)
	dayjs.extend(timezone)
</script>

<div class="flex flex-col gap-2 sm:col-span-2">
	<div
		class="playfair-display-sc-bold flex justify-between border-y border-accent-dark py-1 text-2xs text-accent-light sm:text-sm md:text-base"
	>
		<p>Version {version.version}</p>
		<p>{dayjs.utc(version.startDate).tz(dayjs.tz.guess()).format('MMMM DD YYYY')}</p>
	</div>
	<h1 class="{game} py-2 text-center text-dark sm:text-2xl md:text-4xl">
		{version.name ? version.name : `Version ${version.version} - XXXXX`}
	</h1>
</div>
