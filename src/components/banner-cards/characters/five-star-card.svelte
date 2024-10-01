<script lang="ts">
	import { Image } from '@unpic/svelte'

	export let character, images, game
	//console.log(character.id);

	const gc_found =
		images.gachaCards[
			`../assets/characters/${game}/${character.images ? character.images.gachaCard : ''}.webp`
		] != undefined
	const gachaCard = gc_found
		? images.gachaCards[
				`../assets/characters/${game}/${character.images ? character.images.gachaCard : ''}.webp`
			]
		: images.placeHolders[
				`../assets/placeholders/${game}/${game === 'starrail' ? character.weaponType : character.element}.webp`
			]
</script>

<div
	class={`relative flex h-full flex-col justify-end border border-black border-opacity-20 shadow-xl`}
>
	<div
		class={`absolute bottom-0 z-10 flex h-1/2 w-full flex-col items-center justify-end gap-1 text-center py-4 px-1 sm:py-6 lg:p-4 xl:p-5 ${character.colors ? character.colors.secondary : ''}`}
	>
		<h2 class="text-[.4rem] text-white sm:text-[.6rem] md:text-xs lg:text-2xs xl:text-xs">
			{character.bannerName}
		</h2>
		<h1
			class={game === 'wuwa' || game === 'zzz'
				? 'text-sm text-white sm:text-2xl md:text-xl lg:text-base xl:text-2xl'
				: 'text-[.6rem] text-white sm:text-sm md:text-lg lg:text-base xl:text-lg'}
		>
			{character.name}
		</h1>
	</div>
	<div class="relative h-full w-full">
		<Image
			class="absolute inset-0 h-full w-full"
			height={1050}
			width={600}
			alt={`${character.element} Art`}
			src={images.backgrounds[`../assets/backgrounds/${game}/${character.element}.webp`].default
				.src}
		/>
		<Image
			class={`relative h-full w-full ${character.spec ? 'md:border-6 border-2 [border-image:url(/textures/holo-4.jpg)_10_round] sm:border-4' : ''} ${!gc_found ? 'mix-blend-hard-light' : ''}`}
			src={gachaCard.default.src}
			alt={`${character.name} Art`}
			height={1050}
			width={600}
		/>
		{#if character.debut}
			<div
				class="bg-yellow-400 absolute top-1 left-1 p-[.1rem] bai-jamjuree-bold text-[.5rem] md:p-1 md:text-2xs"
			>
				NEW
			</div>
		{/if}
	</div>
</div>
