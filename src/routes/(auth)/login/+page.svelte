<script lang="ts">
  import { superForm } from "sveltekit-superforms/client"
  import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
  import type { PageData } from "../register/$types";
  import { loginSchema } from "$lib/utils/schemas";


  import { Toast, toastStore } from '@skeletonlabs/skeleton';
  import type { ToastSettings } from '@skeletonlabs/skeleton';

  export let data: PageData;

  const { form, errors, enhance, message } = superForm(data.form, {
    //@ts-expect-error there shouldn't be an error here
    validators: loginSchema,
    onResult({ result }) {
      if (result.type == 'redirect'){
        const t: ToastSettings = {
          message: 'successfully signed in',
        	timeout: 4000
        };
        toastStore.trigger(t);
        console.log('llol')
      }
    }
  });
  
</script>
<SuperDebug data={$form} />
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
          bind:value={$form.username} />
        
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
          bind:value={$form.password} />
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

<Toast/>