<script lang="ts">
  import { Image } from "@unpic/svelte";
  export let weapon;
</script>

<div
  class="flex relative h-full justify-between w-full bg-gradient-to-r text-white from-[#272317] to-[#8D7D52] gap-2 pl-2 rounded-sm items-center"
>
  <h1 class="text-[.25rem] text-balance md:text-[.4rem] lg:text-2xs">
    {weapon.name}
  </h1>
  <img
    class="h-0 aspect-square min-h-full"
    src={weapon.icon}
    alt={`${weapon.name} Icon`}
  />
</div>
