<script lang="ts">
	import { Image } from '@unpic/svelte'
	export let character, images, game

	const gachaCard =
		images.gachaCards[
			`../assets/characters/${game}/${character.images ? character.images.gachaCard : ''}.webp`
		] != undefined
			? images.gachaCards[
					`../assets/characters/${game}/${character.images ? character.images.gachaCard : ''}.webp`
				]
			: images.placeHolders[
					`../assets/placeholders/${game}/${game === 'starrail' || game === 'zzz' ? character.weaponType : character.element}.webp`
				]

	const gradients = {
		zzz: 'bg-gradient-to-br from-zzz-default-gradient-from to-zzz-default-gradient-to',
		physical: 'bg-gradient-to-br from-zzz-physical-gradient-from to-zzz-physical-gradient-to',
		fire: 'bg-gradient-to-br from-zzz-fire-gradient-from to-zzz-fire-gradient-to',
		ice: 'bg-gradient-to-br from-zzz-ice-gradient-from to-zzz-ice-gradient-to',
		electric: 'bg-gradient-to-br from-zzz-electric-gradient-from to-zzz-electric-gradient-to',
		ether: 'bg-gradient-to-br from-zzz-ether-gradient-from to-zzz-ether-gradient-to',
		physical_secondary: 'bg-gradient-to-t from-zzz-physical-gradient-from to-[#F5E80000]',
		fire_secondary: 'bg-gradient-to-t from-zzz-fire-gradient-from to-[#FFB04E00]',
		ice_secondary: 'bg-gradient-to-t from-zzz-ice-gradient-from to-[#B1F8F900]',
		electric_secondary: 'bg-gradient-to-t from-zzz-electric-gradient-from to-[#5DEDFC00]',
		ether_secondary: 'bg-gradient-to-t from-zzz-ether-gradient-from to-[#8BC6FC]',
		zzz_secondary: 'bg-gradient-to-t from-zzz-default-gradient-from '
	}
</script>

<div class=" rounded-br-xl rounded-tl-xl relative flex h-full flex-col justify-end">
	<div
		class={`relative h-full w-full rounded-br-xl rounded-tl-xl border border-black border-opacity-20 shadow-xl ${character.spec ? 'specGradient' : ''}`}
	>
		<Image
			class="relative h-full w-full rounded-br-xl rounded-tl-xl brightness-75 "
			height={750}
			width={600}
			alt={`${character.element} Art`}
			src={images.backgrounds[`../assets/backgrounds/${game}/${character.element}.webp`].default
				.src}
		/>

		<Image
			class={`absolute inset-0 h-full w-full rounded-br-xl`}
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
	<h1 class="sm:text-2xl xl:text-3xl text-center text-black">
		{character.name}
	</h1>
</div>

<style lang="postcss">
	.specGradient {
		position: relative;
		border: 0.25rem solid transparent;
		padding: 0.25;
		background-clip: border-box;
	}
	.specGradient::after {
		position: absolute;
		inset: -0.25rem;
		background: url(./textures/holo-4.jpg);
		background-size: cover;
		background-position: left;
		content: '';
		z-index: -1;
		border-radius: 0.75rem 0 0.75rem 0;
	}
</style>
