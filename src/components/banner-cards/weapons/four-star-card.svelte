<script lang="ts">
  import { Image } from "@unpic/svelte";
  export let weapon;
</script>

<div
  class="flex relative h-min aspect-square justify-between bg-gradient-to-b text-white from-[#37263D] to-[#9367A3] gap-2 rounded-sm items-center px-2"
>
  <h1
    class={`text-[.25rem] text-balance sm:text-[.5rem] md:text-2xs ${weapon.game == "starrail" ? "flex" : "hidden"}`}
  >
    {weapon.name}
  </h1>
  <Image src={weapon.icon} height={256} width={256} />
</div>
