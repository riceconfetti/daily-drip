<script lang="ts">
  import { Image } from "@unpic/svelte";
  export let weapon;
</script>

<div>
  <Image src={weapon.icon} height={0} width={0}></Image>
</div>
