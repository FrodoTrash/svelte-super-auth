<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import type { LayoutData } from './$types';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let data: LayoutData;
</script>

<AppShell>
	<!-- app bar start -->
	<svelte:fragment slot="header">
		{#if data.user}
			<AppBar>
				<svelte:fragment slot="lead">
					<a href="/dashboard">{data.user?.email}</a>
				</svelte:fragment>

				<!-- tail -->
				<svelte:fragment slot="trail">
					<form action="/logout" method="post" use:enhance>
						<button class="btn variant-form-material">LOGOUT</button>
					</form>
				</svelte:fragment>
			</AppBar>
		{:else}
			<AppBar>
				<svelte:fragment slot="lead">
					<a href="/">Actions Auth</a>
				</svelte:fragment>

				<!-- tail -->
				<svelte:fragment slot="trail">
					<a class="btn variant-form-material" href="/login">LOGIN</a>
				</svelte:fragment>
			</AppBar>
		{/if}
	</svelte:fragment>
	<!-- app bar end -->
	<slot />
</AppShell>
