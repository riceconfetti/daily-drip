<script lang="ts">
	import PhaseHeader from './phase-header.svelte'
	import VersionHeader from './version-header.svelte'
	import { Version } from '../../classes/version.ts'
	import CharacterCard from './characters/character-card.svelte'
	import WeaponCard from './weapons/weapon-card.svelte'
	import ChronicledCard from './chronicled-wish/chronicled-card.svelte'
	import FiveStarCharacterCard from './characters/five-star-card.svelte'
	import FiveStarWeaponCard from './weapons/five-star-card.svelte'
	import { settings } from '$scripts/settings'
	import { getTimeVersion } from '$scripts/specs.ts'
	import dayjs from 'dayjs'
	export let version: Version, game, images, gameData

	let timezone = JSON.parse(JSON.stringify(settings.get()))
	version = getTimeVersion(version, timezone[game], gameData)

	$: selectIndex = [0, 0]
</script>

<section
	class={`flex flex-col gap-3 bg-white bg-opacity-30 p-4 shadow-md ${game} lg:grid lg:grid-cols-2 lg:gap-5`}
>
	<VersionHeader {version} {game} />
	{#if version.chronicle}
		<ChronicledCard class="lg:col-span-2" chronicle={version.chronicle} {images} {game} />
	{/if}
	{#each version.phases as phase, pIndex}
		<div class={`flex flex-col h-full gap-2 `}>
			<PhaseHeader {phase} />
			<CharacterCard characters={phase.characters} {images} {game}>
				{#if phase.select}
					<div
						class="flex flex-col p-[2px] w-full h-full bg-gradient-to-br from-dark to-accent-light"
					>
						<div class="flex w-full justify-between p-1 items-center">
							<button
								on:click={() =>
									selectIndex[pIndex] === 0
										? (selectIndex[pIndex] = phase.select.characters.length - 1)
										: selectIndex[pIndex]--}
							>
								<i class="ri-arrow-left-s-line text-white"></i>
							</button>
							<p class="text-white text-2xs md:text-sm lg:text-2xs xl:text-sm">Indelible Coterie</p>
							<button
								on:click={() =>
									selectIndex[pIndex] === phase.select.characters.length - 1
										? (selectIndex[pIndex] = 0)
										: selectIndex[pIndex]++}
							>
								<i class="ri-arrow-right-s-line text-white"></i>
							</button>
						</div>
						{#each phase.select.characters as character, sIndex}
							{#if selectIndex[pIndex] === sIndex}
								<FiveStarCharacterCard {character} {images} {game} />
							{/if}
						{/each}
					</div>
				{/if}
			</CharacterCard>
			<WeaponCard weapons={phase.weapons} {images} {game}>
				{#if phase.select}
					{#each phase.select.weapons as weapon, sIndex}
						{#if selectIndex[pIndex] === sIndex}
							<FiveStarWeaponCard {weapon} {images} {game} />
						{/if}
					{/each}
				{/if}
			</WeaponCard>
		</div>
	{/each}
</section>
