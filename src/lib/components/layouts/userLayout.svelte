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

	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import ManagerModal from '../manager/managerModal.svelte';

	const modalComponentRegistry: Record<string, ModalComponent> = {
		// Custom Modal 1
		ManagerModal: {
			// Pass a reference to your custom component
			ref: ManagerModal,
			// Add the component properties as key/value pairs
			props: { background: 'bg-red-500' },
			// Provide a template literal for the default component slot
			slot: '<p>Skeleton</p>'
		}

		// ...
	};

	const modal: ModalSettings = {
		type: 'component',
		// Pass the component registry key as a string:
		component: 'ManagerModal'
	};
</script>

<Modal components={modalComponentRegistry} />

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/dashboard">{$currentUser?.username}</a>
	</svelte:fragment>

	<!-- tail -->
	<svelte:fragment slot="trail">
		<button class="btn variant-form-material" on:click={modalStore.trigger(modal)}>ADD</button>

		<form action="/logout" method="post" use:enhance>
			<button class="btn variant-form-material">LOGOUT</button>
		</form>
	</svelte:fragment>
</AppBar>
