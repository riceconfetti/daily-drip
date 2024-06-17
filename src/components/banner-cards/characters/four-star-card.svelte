<script lang="ts">
	import { Image } from '@unpic/svelte'
	import colors from '$assets/gradients.json'
	export let character, images, game

	const bannerCard =
		images.bannerCards[`../assets/characters/${character.id}/bannerCard.png`] != undefined
			? images.bannerCards[`../assets/characters/${character.id}/bannerCard.png`]
			: images.placeHolders[`../assets/placeholders/${game}/bannerCard.png`]

	if (bannerCard == undefined) {
		console.log(character)
	}
</script>

<div
	class={`relative flex w-full items-center border-0 border-black border-opacity-20 shadow-lg ${colors[game][character.element]} ${character.spec ? 'md:border-6 border-2 [border-image:url(/textures/holo-4.jpg)_10_round] sm:border-4' : ''}`}
>
	<Image
		class={`right-0 h-full gradient-mask-l-[transparent,rgba(0,0,0,1.0)_0px,rgba(0,0,0,0.8)_30%]`}
		src={bannerCard.default.src}
		alt={`${character.name} Art`}
		layout="constrained"
		height={300}
		width={1150}
	></Image>
	<div class="absolute flex h-full w-full items-center p-2 md:p-4">
		<h1 class={`text-[.6rem] text-white sm:text-xs md:text-base lg:text-sm xl:text-base`}>
			{character.name}
		</h1>
	</div>
</div>
