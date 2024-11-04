<script lang="ts">
	import FiveStarCard from './five-star-card.svelte'
	import FourStarCard from './four-star-card.svelte'
	import ZenCard from './zen-card.svelte'
	export let characters, images, game
</script>

<!-- Characters -->
<section
	class={`grid gap-2 ${game == 'wuwa' && characters.fiveStars.length < 2 ? 'grid-cols-[auto_65%]' : game == 'zzz' ? 'grid-cols-[auto_50%]' : 'grid-cols-[1fr_1fr_45%] lg:grid-cols-[1fr_1fr_40%]'}`}
>
	{#each characters.fiveStars as character}
		<FiveStarCard {character} {images} {game} />
	{/each}
	<slot />
	<div class="flex flex-col justify-end gap-4">
		<h2 class="mt-1 text-right text-dark text-2xs sm:text-sm md:text-xl xl:text-xl">
			Featured Four Stars
		</h2>
		{#if game == 'zzz'}
			<div class="flex h-full gap-3">
				{#each characters.fourStars as character}
					<ZenCard {character} {images} {game} />
				{/each}
			</div>
		{:else}
			{#each characters.fourStars as character}
				<FourStarCard {character} {images} {game} />
			{/each}
		{/if}
	</div>
</section>
