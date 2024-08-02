<script lang="ts">
	import dayjs from 'dayjs'
	export let phase
</script>

<div
	class={`playfair-display-bold flex w-full justify-between border border-black border-opacity-10 p-2 text-2xs sm:text-sm ${phase.number == 0 ? 'bg-[#BFBFBF] text-dark' : 'bg-[#232323] text-accent-dark'}`}
>
	<h1>Phase {phase.number + 1}</h1>
	<p>{dayjs(phase.date).format('MMM D @h a')}</p>
</div>
