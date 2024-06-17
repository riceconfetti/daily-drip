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
		'relative flex h-0 min-h-full items-center justify-center gap-2 rounded-sm bg-gradient-to-b from-[#37263D] to-[#9367A3] p-1 text-white basis-1/5 flex-grow',
		className
	)}
>
	<img class="object-cover h-full object-center" src={weaponImage.default.src} alt={weapon.name} />
</div>
