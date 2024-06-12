<script lang="ts">
  import PhaseHeader from "./phase-header.svelte";
  import VersionHeader from "./version-header.svelte";
  import CharacterCard from "./characters/character-card.svelte";
  import WeaponCard from "./weapons/weapon-card.svelte";
  export let version, events;
  let phases;
</script>

<section class="flex gap-2 bg-white bg-opacity-30 shadow-md p-4">
  <VersionHeader {version} />
  {#each phases as phase}
    <div>
      <PhaseHeader {phase} />
      <CharacterCard characters={phase.characters} />
      <WeaponCard weapons={phase.weapons} />
    </div>
  {/each}
</section>
