<script lang="ts">
	import { Image } from '@unpic/svelte'
	import { twMerge } from 'tailwind-merge'
	let className = ''
	export { className as class }
	export let weapon, images, game

	const weaponImage =
		images.weapons[`../assets/weapons/${weapon.icon}`] != undefined
			? images.weapons[`../assets/weapons/${weapon.icon}`]
			: images.placeHolders[
					`../assets/placeholders/${game}/fourStar_${weapon.game != 'genshin' ? 'default' : weapon.weaponType}.png`
				]
	if (weaponImage == undefined) {
		console.log(weaponImage)
	}
</script>

<div
	class={twMerge(
		'relative basis-1/6 flex flex-shrink aspect-square h-min items-center justify-between gap-2 rounded-sm bg-gradient-to-b from-[#272317] to-[#8D7D52] text-white',
		className
	)}
>
	<Image src={weaponImage.default.src} height={256} width={256} />
</div>

