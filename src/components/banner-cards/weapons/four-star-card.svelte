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
		'flex relative h-min aspect-square justify-between bg-gradient-to-b text-white from-[#37263D] to-[#9367A3] gap-2 rounded-sm items-center px-2',
		className
	)}
>
	<Image src={weaponImage.default.src} height={256} width={256} />
</div>
