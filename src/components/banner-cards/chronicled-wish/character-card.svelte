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
</script>

<div
	class={`border border-black shadow-xl border-opacity-20 relative flex flex-col h-full justify-end`}
>
	<div class="relative w-full h-full">
		<Image
			class="absolute inset-0 w-full h-full"
			height={1050}
			width={600}
			alt={`${character.element} Art`}
			src={images.backgrounds[`../assets/backgrounds/${character.element}.png`].default.src}
		/>
		<Image
			class={`relative w-full h-full ${character.spec ? 'border-2 sm:border-4 md:border-6 [border-image:url(/textures/holo-4.jpg)_10_round]' : ''}`}
			src={gachaCard.default.src}
			alt={`${character.name} Art`}
			height={1050}
			width={600}
		/>
	</div>
</div>
