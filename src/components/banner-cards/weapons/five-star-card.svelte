<script lang="ts">
	import { twMerge } from 'tailwind-merge'
	let className = ''
	export { className as class }
	export let weapon, images, game
	const weaponImage =
		images.weapons[`../assets/weapons/${weapon.icon}`] != undefined
			? images.weapons[`../assets/weapons/${weapon.icon}`]
			: images.placeHolders[
					`../assets/placeholders/${game}/fiveStar_${game != 'genshin' ? 'default' : weapon.weaponType}.png`
				]
	//console.log(weaponImage);
	if (weaponImage == undefined) {
		console.log(weaponImage)
	}
</script>

<div
	class={twMerge(
		'relative flex h-auto w-full items-center justify-between gap-2 rounded-sm bg-gradient-to-r from-[#272317] to-[#8D7D52] text-white',
		className
	)}
>
	<div
		class="h-min p-2 pr-4 sm:max-w-[130px] md:max-w-[140px] lg:max-w-[110px] xl:max-w-[135px] min-h-8 md:min-h-12 flex items-center"
	>
		<h1
			class="text-balance text-[.3rem] sm:text-2xs md:text-xs lg:text-[.45rem] lg:leading-normal xl:text-[.7rem]"
		>
			{weapon.name}
		</h1>
	</div>
	<img
		class="absolute right-0 aspect-square h-0 min-h-full p-1"
		src={weaponImage.default.src}
		alt={`${weapon.name} Icon`}
	/>
</div>
