<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/">SUPERFORMS AUTH</a>
	</svelte:fragment>

	<!-- tail -->
	<svelte:fragment slot="trail">
		<a href="/register" class="btn variant-form-material">REGISTER</a>
		<a href="/login" class="btn variant-form-material">LOGIN</a>
	</svelte:fragment>
</AppBar>
