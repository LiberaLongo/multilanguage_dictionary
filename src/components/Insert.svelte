<script lang="ts">
	import Language from './Language.svelte';
	let languages = [
		{ id: "English", myself: "English", pronunciation: false},
		{ id: "Italian", myself: "Italiano", pronunciation: false},
		{ id: "Chinese", myself: "汉语", pronunciation: true},
		{ id: "Japanese", myself: "日本語", pronunciation: true},
		{ id: "German", myself: "Deutsch", pronunciation: false},
		{ id: "Russian", myself: "Русский", pronunciation: false},
		{ id: "French", myself: "Français", pronunciation: false},
	];
</script>

<h1>Insert</h1>
<a href="/">home</a>
<form action="/submit" method="POST">
{#each languages as language}
	<Language {...language} />
{/each}
<input type="submit" value="Insert" />
</form>

<style>
</style>
