<script lang="ts">
	import FiveStarCard from './five-star-card.svelte'
	import FourStarCard from './four-star-card.svelte'
	export let characters, images, game
</script>

<!-- Characters -->
<section
	class={`grid gap-2 ${game == 'wuwa' ? 'grid-cols-[auto_65%]' : 'grid-cols-[1fr_1fr_45%] lg:grid-cols-[1fr_1fr_40%]'}`}
>
	{#each characters.fiveStars as character}
		<FiveStarCard {character} {images} {game} />
	{/each}
	<div class="flex flex-col justify-end gap-4">
		<h2 class="mt-1 text-right text-2xs text-dark sm:text-sm md:text-xl xl:text-xl">
			Featured Four Stars
		</h2>
		{#each characters.fourStars as character}
			<FourStarCard {character} {images} {game} />
		{/each}
	</div>
</section>
