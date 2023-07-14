<script lang="ts">
	import { Toast } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">You're authorized</h1>
		<p>Start by exploring:</p>
		<ul>
			<li>
				<code class="code">username</code> - {data.user?.username}
			</li>
			<li>
				<code class="code">email</code> -{data.user?.email}
			</li>
			<li><code class="code">registered</code> - {data.user?.created}</li>
		</ul>
	</div>
</div>

<Toast />
