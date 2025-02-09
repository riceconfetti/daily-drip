<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { settings, type Settings, getServer } from "$store/settings.svelte";

  let { game = "genshin" } = $props();

  onMount(() => {
    const userSettings = window.localStorage.getItem("settings");
    if (userSettings) {
      const temp: Settings = JSON.parse(userSettings);
      Object.keys(temp).forEach((k: string) => {
        settings[k] = temp[k];
      });
    }
  });

  $effect(() => {
    window.localStorage.setItem("settings", JSON.stringify(settings));
  });
</script>

<div class="flex gap-2 flex-col">
  <!-- <p>{JSON.stringify(settings[game])}</p>
  <p>{JSON.stringify(getServer(game))}</p> -->
</div>
