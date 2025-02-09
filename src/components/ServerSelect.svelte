<script lang="ts">
  import { settings } from "$store/settings.svelte.ts";
</script>

<div class="flex gap-2 hidden">
  <select bind:value={settings.starrail}>
    <option value="Asia">Asia</option>
    <option value="Europe">Europe</option>
    <option value="America">Amercia</option>
  </select>
</div>
