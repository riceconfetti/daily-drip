<script lang="ts">
	import CharacterCard from './character-card.svelte'
	import WeaponCard from './weapon-card.svelte'
	import PriorityWeaponCard from './priority-weapon-card.svelte'
	import { twMerge } from 'tailwind-merge'
	let className = ''
	export { className as class }
	export let chronicle, images, game
	//   chronicle = {
	//     characters: [],
	//     weapons: [],
	//   };
</script>

<section class={twMerge('border-accent-light border flex flex-col gap-2', className)}>
	<div class="w-full p-2 bg-accent-light justify-center items-center">
		<h1 class="playfair-display-sc-bold text-white text-center">Chronicled Wish</h1>
	</div>
	<div class="p-2 flex gap-2">
		<div class="grid grid-rows-2 grid-cols-3 w-full gap-2 lg:flex lg:flex-row">
			{#each chronicle.characters as character}
				<CharacterCard {character} {images} {game} />
			{/each}
		</div>

		<div class="w-full flex flex-col gap-2">
			<div class="flex flex-col gap-2 lg:flex-row">
				{#each chronicle.weapons as weapon}
					{#if weapon.priority}
						<PriorityWeaponCard {weapon} {images} {game} />
					{/if}
				{/each}
			</div>

			<div class="flex gap-2 flex-shrink flex-row flex-wrap items-center justify-center">
				{#each chronicle.weapons as weapon}
					{#if !weapon.priority}
						<WeaponCard class="lg:basis-1/12" {weapon} {images} {game} />
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>
