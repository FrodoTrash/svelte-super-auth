<script lang="ts">
	import { login } from '$lib/utils/schemas';
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance, message, delayed } = superForm(data.form, {
		onError({ result }) {
			$message = result.error.message;
		}
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">login</h1>

		<!-- username -->
		<form action="/api/login" method="post" use:enhance>
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

			<!-- password -->
			<label class="label">
				<span>username</span>
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

			<!-- submit button -->
			<button class="btn variant-form-material" type="submit">submit</button>
		</form>

		<!-- error messages -->
		{#if $message}
			<small class="message">{$message}</small>
		{/if}

		<!-- loading  -->
		{#if $delayed} <small>loading...</small>{/if}

		<a href="/register">Create an account</a>
	</div>
</div>
