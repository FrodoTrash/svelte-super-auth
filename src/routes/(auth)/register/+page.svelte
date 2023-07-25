<script lang="ts">
	import type { PageData } from './$types';
	import { register } from '$lib/utils/schemas';

	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance, message, delayed } = superForm(data.form, {
		validators: register
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-4">
		<h1 class="h1">login</h1>

		<form action="/register" method="post" use:enhance>
			<!-- username -->
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

			<!-- email -->
			<label class="label">
				<span>email</span>
				<input
					class:input-error={$errors.email}
					class="variant-form-material input"
					type="email"
					placeholder="email"
					name="email"
					bind:value={$form.email}
				/>
				{#if $errors.email}
					<small>{$errors.email}</small>
				{/if}
			</label>

			<!-- password -->
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

			<!-- passwordConfirm -->
			<label class="label">
				<span>Confirm password</span>
				<input
					class:input-error={$errors.passwordConfirm}
					class="variant-form-material input"
					type="password"
					placeholder="confirm password"
					name="passwordConfirm"
					bind:value={$form.passwordConfirm}
				/>
				{#if $errors.passwordConfirm}
					<small>{$errors.passwordConfirm}</small>
				{/if}
			</label>

			<!-- submit button -->
			<button class="btn variant-form-material" type="submit">submit</button>

			<!-- loading -->
			{#if $delayed} <small>loading...</small>{/if}

			<!-- server message -->
			{#if $message}
				<small class="message">{$message}</small>
			{/if}
		</form>

		<!-- back to login -->
		<a href="/login">Already registered?</a>
	</div>
</div>
