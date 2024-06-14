<script lang="ts">
  import PhaseHeader from "./phase-header.svelte";
  import VersionHeader from "./version-header.svelte";
  import { Version } from "../../classes/version.ts";
  import CharacterCard from "./characters/character-card.svelte";
  import WeaponCard from "./weapons/weapon-card.svelte";
  import dayjs from "dayjs";
  export let version: Version, game;
</script>

<section
  class={`flex flex-col gap-3 bg-white bg-opacity-30 shadow-md p-4 ${game} lg:grid lg:grid-cols-2 lg:gap-5`}
>
  <VersionHeader {version} />
  {#each version.phases as phase}
    <div
      class={`flex flex-col gap-2 ${dayjs(phase.date) < dayjs() ? "grayscale" : ""}`}
    >
      <PhaseHeader {phase} />
      <CharacterCard characters={phase.characters} />
      <WeaponCard weapons={phase.weapons} />
    </div>
  {/each}
</section>
