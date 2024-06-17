<script lang="ts">
	import { Image } from '@unpic/svelte'

	export let character, images, game
	//console.log(character.id);

	const gachaCard =
		images.gachaCards[
			`../assets/characters/${game}/${character.images ? character.images.gachaCard : ''}.png`
		] != undefined
			? images.gachaCards[
					`../assets/characters/${game}/${character.images ? character.images.gachaCard : ''}.png`
				]
			: images.placeHolders[
					`../assets/placeholders/${game}/${game === 'starrail' ? character.weaponType : character.element}.png`
				]
	if (gachaCard && gachaCard == undefined) {
		console.log(character)
	}

	if (images.backgrounds[`../assets/backgrounds/${game}/${character.element}.png`] == undefined) {
		console.log(`${game}/${character.element}`)
	}
</script>

<div
	class={`relative flex h-full flex-col justify-end border border-black border-opacity-20 shadow-xl`}
>
	<div
		class={`absolute bottom-0 z-10 flex h-2/3 w-full flex-col items-center justify-end gap-1 p-3 text-center sm:p-4 md:p-6 lg:p-4 xl:p-5 ${character.colors ? character.colors.secondary : ''}`}
	>
		<h2 class="text-[.35rem] text-white sm:text-[.5rem] md:text-xs lg:text-2xs xl:text-xs">
			{character.bannerName}
		</h2>
		<h1 class="text-[.6rem] text-white sm:text-sm md:text-xl lg:text-base xl:text-lg">
			{character.name}
		</h1>
	</div>
	<div class="relative h-full w-full">
		<Image
			class="absolute inset-0 h-full w-full"
			height={1050}
			width={600}
			alt={`${character.element} Art`}
			src={images.backgrounds[`../assets/backgrounds/${game}/${character.element}.png`].default.src}
		/>
		<Image
			class={`relative h-full w-full ${character.spec ? 'md:border-6 border-2 [border-image:url(/textures/holo-4.jpg)_10_round] sm:border-4' : ''}`}
			src={gachaCard.default.src}
			alt={`${character.name} Art`}
			height={1050}
			width={600}
		/>
	</div>
</div>
