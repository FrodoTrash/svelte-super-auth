<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	import type { PageData } from '../register/$types';
	import { loginSchema } from '$lib/utils/schemas';

	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { pb } from '$lib/utils/pocketbase';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.form, {
		validators: loginSchema,
		onResult({ result }) {
			if (result.type == 'redirect') {
				pb.authStore.loadFromCookie(document.cookie);
				const t: ToastSettings = {
					message: 'successfully signed in',
					timeout: 5000
				};
				toastStore.trigger(t);
			}
		}
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">login</h1>

		<form action="?/login" method="post" use:enhance>
			<label class="label">
				<span>username</span>

				<input
					class:input-error={$errors.username}
					class="variant-form-material input"
					type="text"
					placeholder="username"
					name="username"
					bind:value={$form.username}
				/>

				{#if $errors.username}
					<small>{$errors.username}</small>
				{/if}
			</label>

			<label class="label">
				<span>password</span>
				<input
					class:input-error={$errors.password}
					class="variant-form-material input"
					type="password"
					placeholder="password"
					name="password"
					bind:value={$form.password}
				/>
				{#if $errors.password}
					<small>{$errors.password}</small>
				{/if}
			</label>

			<button class="btn variant-form-material" type="submit">Submit</button>
			{#if $message}
				<div class="message">{$message}</div>
			{/if}
		</form>
	</div>
</div>

<Toast />
