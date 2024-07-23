<script>
	export let id;
	export let myself;
	export let pronunciation=false;
</script>

<img src="images/{id}.png" alt={id}>
<label for="{id}">{myself}</label>
{#if pronunciation}
<input type="text" name={id}>
<input type="text" name="p_{id}">
{:else}
<input type="text" class="long" name={id}>
{/if}
<br>

<style>
	img { height: 10vh; width: 15vw; }
	label { font-size: 3em; }
	input[type=text] { font-size: 2em; width: 20vw; }
	input[class=long] { width: 60vw; }
</style>

