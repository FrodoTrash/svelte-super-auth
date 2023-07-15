<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import type { LayoutData, PageData } from '../../../routes/$types';
	import { superForm } from 'sveltekit-superforms/client';

	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: LayoutData;

	// TODO add superforms to logout
	const { form, enhance } = superForm(data.form, {
		onError({ result }) {
			const t: ToastSettings = {
				message: result.error.message,
				timeout: 5000
			};
			toastStore.trigger(t);
		},
		onResult({ result }) {
			if (result.type == 'redirect') {
				const t: ToastSettings = {
					message: 'successfully signed out',
					timeout: 5000
				};
				toastStore.trigger(t);
			}
		},
		warnings: { noValidationAndConstraints: false }
	});
</script>

<Toast />

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/dashboard">{data.user?.username}</a>
	</svelte:fragment>

	<!-- tail -->
	<svelte:fragment slot="trail">
		<form action="/logout" method="post" use:enhance>
			<button class="btn variant-form-material">LOGOUT</button>
		</form>
	</svelte:fragment>
</AppBar>
