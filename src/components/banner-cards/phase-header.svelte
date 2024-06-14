<script lang="ts">
  import dayjs from "dayjs";
  export let phase;
</script>

<div
  class={`border border-black border-opacity-10 w-full flex justify-between playfair-display-bold text-2xs p-2 sm:text-sm ${phase.number == 0 ? "bg-[#BFBFBF] text-dark" : "bg-[#232323] text-accent-dark"}`}
>
  <h1>Phase {phase.number + 1}</h1>
  <p>{dayjs(phase.date).format("MMM D")}</p>
</div>
