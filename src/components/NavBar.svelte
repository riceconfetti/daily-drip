<script lang="ts">
  $: sidebar = true;

  function toggleSidebar() {
    sidebar = !sidebar;
  }
</script>

<main class="relative flex flex-col overflow-x-hidden h-dvh w-dvw items-center">
  <div
    class="sticky z-30 top-0 flex w-full bg-dark playfair-display-sc-bold text-light p-4 justify-between"
  >
    <a href="./" class="flex gap-4">
      <i class="ri-newspaper-fill text-accent-dark text-lg"></i>
      <span class="text-lg">The Daily Drip</span>
    </a>
    <button class="w-fit lg:hidden" on:click={toggleSidebar}>
      <i class="ri-menu-line text-lg"></i>
    </button>
    <div
      class="hidden md:flex list-none text-light gap-6 text-sm items-center playfair-display-sc-bold"
      data-sidebar={sidebar}
    >
      <a href="./genshin">Genshin Impact</a>
      <a href="./starrail">Honkai: Star Rail</a>
      <a href="./wuwa">Wuthering Waves</a>
      <a href="./reverse">Reverse: 1999</a>
      <!-- <a href="./calendar">Calendar</a> -->
      <!-- <li>Archive</li> -->
    </div>
  </div>

  <div
    class="z-20 fixed top-0 flex w-full bg-dark h-0 min-h-full data-[sidebar='true']:translate-x-full transition-all flex-col p-16 py-24 list-none text-light gap-4 text-lg items-center playfair-display-sc-bold"
    data-sidebar={sidebar}
  >
    <a class="p-3" href="./genshin">Genshin Impact</a>
    <a class="p-3" href="./starrail">Honkai: Star Rail</a>
    <a class="p-3" href="./wuwa">Wuthering Waves</a>
    <a class="p-3" href="./reverse">Reverse: 1999</a>
    <!-- <a class="p-3" href="./calendar">Calendar</a> -->
    <!-- <li>Archive</li> -->
  </div>

  <slot></slot>
</main>
