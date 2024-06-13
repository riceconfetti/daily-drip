<script lang="ts">
  import dayjs from "dayjs";
  export let version;
</script>

<div class="flex flex-col gap-2 md:col-span-2">
  <div
    class="flex justify-between text-2xs playfair-display-sc-bold text-accent-light py-1 border-y border-accent-dark md:text-sm"
  >
    <p>Version {version.version}</p>
    <p>{dayjs(version.startDate).format("MMMM DD YYYY")}</p>
  </div>
  <h1 class="playfair-display-sc-bold text-dark text-center md:text-4xl">
    {version.name ? version.name : `Version ${version.number}: ???????`}
  </h1>
</div>
