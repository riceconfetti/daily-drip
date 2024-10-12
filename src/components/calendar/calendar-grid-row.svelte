<script lang="ts">
	import { twMerge } from 'tailwind-merge'
	let className = ''

	export { className as class }
</script>

<div
	class={twMerge(
		'relative h-full w-full text-sm divide-x divide-dark divide-opacity-30 grid grid-cols-subgrid col-span-7 ',
		className
	)}
>
	<slot></slot>
</div>
