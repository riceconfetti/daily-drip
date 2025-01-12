<script>
  import Holo from "$assets/overlays/Holo_Portrait.png";

  let width, height;

  $: svgpath = `M${width - 2},14l0,${height - 24}c-6,-0 -12,6 -12,12l-${width - 28},-0c0,-6 -6,-12 -12,-12l0,-${height - 20}c6,-0 12,-6 12,-12l${width - 28},-0c0,6 6,12 12,12Z`;
  $: viewbox = `0 0 ${width} ${height}`;
</script>

<div
  class="absolute inset-0"
  bind:clientHeight={height}
  bind:clientWidth={width}
>
  <div class="absolute inset-2 z-20 flex justify-between text-accent-150">
    <svg
      class="size-full stroke-[1.5]"
      viewBox={viewbox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={svgpath} style="fill:none; stroke:#D7B471" />
    </svg>
  </div>
  <div
    class="grid grid-cols-2 grid-rows-2 absolute inset-[0.45rem] z-20 text-accent-150"
  >
    <svg
      class="size-3"
      viewBox="0 0 431 523"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
      xmlns:serif="http://www.serif.com/"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
    >
      <path
        d="M224.736,77.471c-0,33.784 16.748,104.268 46.932,140.959c30.184,36.691 88.169,57.05 115.962,57.05c-27.793,-0 -85.778,20.359 -115.962,57.049c-30.184,36.691 -46.932,107.176 -46.932,140.959c-0,-33.783 -16.749,-104.268 -46.932,-140.959c-30.184,-36.69 -88.169,-57.049 -115.962,-57.049c27.793,-0 85.778,-20.359 115.962,-57.05c30.183,-36.691 46.932,-107.175 46.932,-140.959Z"
        style="fill:currentColor;"
      />
    </svg>
    <svg
      class="size-3 justify-self-end"
      viewBox="0 0 431 523"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
      xmlns:serif="http://www.serif.com/"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
    >
      <path
        d="M224.736,77.471c-0,33.784 16.748,104.268 46.932,140.959c30.184,36.691 88.169,57.05 115.962,57.05c-27.793,-0 -85.778,20.359 -115.962,57.049c-30.184,36.691 -46.932,107.176 -46.932,140.959c-0,-33.783 -16.749,-104.268 -46.932,-140.959c-30.184,-36.69 -88.169,-57.049 -115.962,-57.049c27.793,-0 85.778,-20.359 115.962,-57.05c30.183,-36.691 46.932,-107.175 46.932,-140.959Z"
        style="fill:currentColor;"
      />
    </svg>
    <svg
      class="size-3 self-end"
      viewBox="0 0 431 523"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
      xmlns:serif="http://www.serif.com/"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
    >
      <path
        d="M224.736,77.471c-0,33.784 16.748,104.268 46.932,140.959c30.184,36.691 88.169,57.05 115.962,57.05c-27.793,-0 -85.778,20.359 -115.962,57.049c-30.184,36.691 -46.932,107.176 -46.932,140.959c-0,-33.783 -16.749,-104.268 -46.932,-140.959c-30.184,-36.69 -88.169,-57.049 -115.962,-57.049c27.793,-0 85.778,-20.359 115.962,-57.05c30.183,-36.691 46.932,-107.175 46.932,-140.959Z"
        style="fill:currentColor;"
      />
    </svg>
    <svg
      class="size-3 self-end justify-self-end"
      viewBox="0 0 431 523"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
      xmlns:serif="http://www.serif.com/"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
    >
      <path
        d="M224.736,77.471c-0,33.784 16.748,104.268 46.932,140.959c30.184,36.691 88.169,57.05 115.962,57.05c-27.793,-0 -85.778,20.359 -115.962,57.049c-30.184,36.691 -46.932,107.176 -46.932,140.959c-0,-33.783 -16.749,-104.268 -46.932,-140.959c-30.184,-36.69 -88.169,-57.049 -115.962,-57.049c27.793,-0 85.778,-20.359 115.962,-57.05c30.183,-36.691 46.932,-107.175 46.932,-140.959Z"
        style="fill:currentColor;"
      />
    </svg>
  </div>
  <img src={Holo.src} alt="Spec" class="mix-blend-screen z-10 w-full h-full" />
</div>
