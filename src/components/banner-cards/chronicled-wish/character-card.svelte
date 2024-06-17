<script lang="ts">
	import { Image } from '@unpic/svelte'

	export let character, images, game
	//console.log(character)

	const gachaSplash =
		images.gachaSplash[
			`../assets/characters/${game}/${character.images ? character.images.gachaSplash : ''}.png`
		] != undefined
			? images.gachaSplash[
					`../assets/characters/${game}/${character.images ? character.images.gachaSplash : ''}.png`
				]
			: images.placeHolders[
					`../assets/placeholders/${game}/${game === 'starrail' ? character.weaponType : character.element}.png`
				]
	if (gachaSplash && gachaSplash == undefined) {
		console.log(character)
	}
</script>

<div
	class={`relative flex h-full flex-col justify-end border border-black border-opacity-20 shadow-xl`}
>
	<div class="relative h-full w-full">
		<img
			class="absolute aspect-square w-full lg:h-full object-cover lg:aspect-[1/2]"
			width={600}
			alt={`${character.element} Art`}
			src={images.backgrounds[`../assets/backgrounds/${game}/${character.element}.png`].default.src}
		/>

		<img
			class={`relative object-cover aspect-square lg:aspect-[1/2] w-full ${character.spec ? 'border-2 [border-image:url(/textures/holo-4.jpg)_10_round]' : ''}`}
			data-spec={character.spec}
			src={gachaSplash.default.src}
			alt={`${character.name} Art`}
			width={600}
		/>
	</div>
</div>
