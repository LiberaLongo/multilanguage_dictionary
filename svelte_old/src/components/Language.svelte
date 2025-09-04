<!-- Language.svelte -->
<script>
  export let lang;
  export let wordVariable;
  export let wordPronunciation;
</script>

<div>
	<img src="images/{lang.id}.png" alt={lang.id}>
	<label for={lang.id} style="font-size: 3em;">{lang.id}:</label>
	<input
		id={lang.id}
		type="text"
		bind:value={wordVariable} />
	{#if lang.pronunciation}
	<label for={"p_" + lang.id}>pronunciation for {lang.id}:</label>
	<input
		id={"p_" + lang.id}
		type="text"
		bind:value={wordPronunciation} />
	{/if}
</div>

<style>
	img { height: 10vh; width: 15vw; }
	input { font-size: 2em; width: 20vw; }
</style>

