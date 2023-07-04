<script lang="ts">
  import { superForm } from "sveltekit-superforms/client"
  import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"

	import type { PageData } from "../register/$types";
	import { registerSchema } from "$lib/utils/schemas";

  export let data: PageData;

  const { form, errors, enhance } = superForm(data.form, {
    validators: registerSchema
  });

</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-5">
    
    <h1 class="h1">register</h1>

    <form action="?/register" method="post" use:enhance>

      <label class="label">
        <span>username</span>
        <input             
          class:input-error={$errors.username}
          class="variant-form-material input" 
          type="text" placeholder="username" 
          name="username" 
          bind:value={$form.username} />

        {#if $errors.username}
            <small>{$errors.username}</small>
        {/if}
      </label>

      <label class="label">
        <span>email</span>
        <input 
          class:input-error={$errors.email}
          class="variant-form-material input"
          type="email" 
          placeholder="email" 
          name="email" 
          bind:value={$form.email} />

        {#if $errors.email}
          <small>{$errors.email}</small>
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
          bind:value={$form.password} />

        {#if $errors.password}
          <small>{$errors.password}</small>
        {/if}
      </label>

      <label class="label">
        <span>confirm password</span>
        <input 
          class:input-error={$errors.passwordConfirm}
          class="variant-form-material input"
          type="password" 
          placeholder="repeat password" 
          name="passwordConfirm" 
          bind:value={$form.passwordConfirm} />

        {#if $errors.passwordConfirm}
          <small>{$errors.passwordConfirm}</small>
        {/if}
      </label>
      
      <button class="btn variant-form-material" type="submit">Submit</button>
    </form>

  </div>
</div>
