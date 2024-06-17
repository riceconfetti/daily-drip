<script lang="ts">
	import PhaseHeader from './phase-header.svelte'
	import VersionHeader from './version-header.svelte'
	import { Version } from '../../classes/version.ts'
	import CharacterCard from './characters/character-card.svelte'
	import WeaponCard from './weapons/weapon-card.svelte'
	import ChronicledCard from './chronicled-wish/chronicled-card.svelte'
	import dayjs from 'dayjs'
	export let version: Version, game, images
</script>

<section
	class={`flex flex-col gap-3 bg-white bg-opacity-30 p-4 shadow-md ${game} lg:grid lg:grid-cols-2 lg:gap-5`}
>
	<VersionHeader {version} {game} />
	{#if version.chronicle}
		<ChronicledCard class="lg:col-span-2" chronicle={version.chronicle} {images} {game} />
	{/if}
	{#each version.phases as phase}
		<div class={`flex flex-col h-full gap-2 ${dayjs(phase.date) < dayjs() ? 'grayscale' : ''}`}>
			<PhaseHeader {phase} />
			<CharacterCard characters={phase.characters} {images} {game} />
			<WeaponCard weapons={phase.weapons} {images} {game} />
		</div>
	{/each}
</section>
