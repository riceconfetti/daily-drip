<script lang="ts">
  import { Image } from "@unpic/svelte";
  export let weapon;
</script>

<div
  class="flex relative h-full aspect-square justify-between bg-gradient-to-b text-white from-[#37263D] to-[#9367A3] gap-2 rounded-sm items-center"
>
  <Image src={weapon.icon} height={256} width={256} />
</div>
