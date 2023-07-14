<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { Toast } from '@skeletonlabs/skeleton';
	import { AppShell } from '@skeletonlabs/skeleton';

	import type { LayoutData } from './$types';

	import UserLayout from '$lib/components/layouts/userLayout.svelte';
	import DefaultLayout from '$lib/components/layouts/DefaultLayout.svelte';

	export let data: LayoutData;
</script>

<Toast />
<AppShell>
	<svelte:fragment slot="header">
		{#if data.user}
			<UserLayout {data} />
		{:else}
			<DefaultLayout />
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
