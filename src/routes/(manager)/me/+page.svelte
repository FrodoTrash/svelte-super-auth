<script lang="ts">
  import type { PageData } from './$types';
  

	import { Toast, toastStore } from '@skeletonlabs/skeleton';
  import type { ToastSettings } from '@skeletonlabs/skeleton';

	
  export let data: PageData;
</script>


<dl class="list-dl">
	<div>
		<span class="badge bg-primary-500">💀</span>
		<span class="flex-auto">
			<dt>Title</dt>
			<dd>Description</dd>
		</span>
    <button class="btn variant-form-material">options</button>
    <button class="btn variant-form-material">remove</button>
	</div>
  
</dl>


<Toast/>