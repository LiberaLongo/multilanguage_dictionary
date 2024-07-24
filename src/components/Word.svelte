<script>
	import { onMount } from 'svelte';
	
	export let name;
	export let lang;
	
	onMount(() => {
		// Carica i dati al montaggio del componente
		const savedData = localStorage.getItem( name );
		if (savedData) {
			data = JSON.parse(savedData);
		}
	});
</script>

<div class="card" style="width: 50%;">
	<div class="row g-0">
		<div class="col-md-4">
			<img src="images/${langEn[l]}.png" class="img-fluid rounded-start" alt="${langEn[l]}">
			<h5 class="card-title text-center">{lang.myself} ({lang.id})</h5>
		</div>
		<div class="col-md-8">
			<div class="card-body">
				<p class="card-text text">{}</p>
			</div>
		</div>
	</div>
</div>

<style>
</style>

