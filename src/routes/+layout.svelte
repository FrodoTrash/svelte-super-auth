<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	// import type { PageData } from '../$types';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { currentUser } from './../lib/utils/pocketbase';
	export let data: PageData;

	import UserLayout from '$lib/components/layouts/userLayout.svelte';
	import DefaultLayout from '$lib/components/layouts/DefaultLayout.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		{#if $currentUser}
			<UserLayout {currentUser} {data} />
		{:else}
			<DefaultLayout />
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
