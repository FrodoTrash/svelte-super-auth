<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import type { PageData } from '../../../routes/$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { pb } from '$lib/utils/pocketbase';

	export let data: PageData;

	// FIXME ? better way?
	const { form, errors, enhance } = superForm(data.form, {
		onResult({ result }) {
			if (result.type == 'redirect') {
				pb.authStore.clear();
			}
		},
		warnings: { noValidationAndConstraints: false }
	});

	// FIXME this shouldn't be any I think
	export let currentUser: any;
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/dashboard">{$currentUser?.username}</a>
	</svelte:fragment>

	<!-- tail -->
	<svelte:fragment slot="trail">
		<form action="/logout" method="post" use:enhance>
			<button class="btn variant-form-material">LOGOUT</button>
		</form>
	</svelte:fragment>
</AppBar>
