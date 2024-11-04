<script lang="ts">
	import FiveStarCard from './five-star-card.svelte'
	import FourStarCard from './four-star-card.svelte'
	export let weapons, images, game
</script>

<!-- Weapons -->

<section class="flex w-full flex-col flex-grow">
	<h2 class="text-2xs text-dark sm:text-sm">Rate Up Weapons</h2>
	<div
		class={`grid grid-cols-[1fr_1fr_40%] gap-2 flex-grow ${game == 'wuwa' && weapons.fiveStars.length < 2 ? 'grid-cols-[1fr_65%]' : game == 'zzz' ? 'grid-cols-[auto_50%]' : 'grid-cols-[1fr_1fr_45%] lg:grid-cols-[1fr_1fr_40%]'}`}
	>
		{#each weapons.fiveStars as weapon}
			<FiveStarCard {weapon} {images} {game} />
		{/each}

		<slot />

		<div class="flex h-full w-full justify-between gap-1 flex-grow">
			{#each weapons.fourStars as weapon}
				<FourStarCard {weapon} {images} {game} />
			{/each}
		</div>
	</div>
</section>
