<script lang="ts">
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'
	export let phase

	dayjs.extend(utc)
	dayjs.extend(timezone)
</script>

<div
	class={`tracking-normal playfair-display-bold flex w-full justify-between border border-black border-opacity-10 p-2 text-2xs sm:text-sm ${phase.number == 0 ? 'bg-[#BFBFBF] text-dark' : 'bg-[#232323] text-accent-dark'}`}
>
	<h1>Phase {phase.number + 1}</h1>
	<p>
		{dayjs.utc(phase.date).tz(dayjs.tz.guess()).format('MMM D')} @ {dayjs
			.utc(phase.date)
			.tz(dayjs.tz.guess())
			.format('h a')}
	</p>
</div>
