<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { currentUser, pb } from '$lib/utils/pocketbase';
	import { applyAction, enhance } from '$app/forms';
</script>

<AppShell>
	<svelte:fragment slot="header">
		
		<AppBar>
			<svelte:fragment slot="lead">
				<a href='/'>SUPERFORMS AUTH</a>
			</svelte:fragment>
			
			<!-- tail -->
			<svelte:fragment slot="trail">
				{#if $currentUser}
					<form method="post" action="/logout" use:enhance={() => {
						return async ({ result }) => {
							pb.authStore.clear();
							await applyAction(result);
						}
					}}>
						<button class="btn variant-filled"></button>
					</form>
				{:else}
						<a href='/register' class="btn variant-filled">REGISTER</a>
						<a href='/login' class="btn variant-filled">LOGIN</a>
				{/if}
			</svelte:fragment>

		</AppBar>
	</svelte:fragment>

	<slot />

</AppShell>