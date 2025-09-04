<!-- Insert.svelte -->
<script>
	import Language from './Language.svelte';
	import {languages, downloadJSON} from './utils.js';
	
	let word;
	//per memorizzare i valori degli input
	let wordVariables = {};
	let wordPronunciations = {};	
	languages.forEach(lang => {
		wordVariables[lang.id] = '';
		if (lang.pronunciation) {
			wordPronunciations['p_' + lang.id] = '';
		}
	});
	
	function handleSubmit(event) {
		event.preventDefault();
		word = languages.reduce((acc, lang) => {
			if (lang.pronunciation) {
				acc[lang.id.toLowerCase()] = {
					character: wordVariables[lang.id],
					pronunciation: wordPronunciations['p_' + lang.id]
				};
			} else {
				acc[lang.id.toLowerCase()] = wordVariables[lang.id];
			}
			return acc;
		}, {});
		//aggiornare i dati e salvarli nel localStorage
		localStorage.setItem(word.english, JSON.stringify(word));
	}
</script>

<h1>Insert a word in your multi-language dictionary</h1>
<a href="/">home</a>
<form action="/submit" method="POST"  on:submit={handleSubmit}>
{#each languages as lang}
	<Language {lang}
	bind:wordVariable={wordVariables[lang.id]}
	bind:wordPronunciation={wordPronunciations['p_' + lang.id]} />
{/each}
<button type="submit">Insert</button>
</form>

<pre>{JSON.stringify(word, null, 2)}</pre>
<button on:click={downloadJSON(word, word.english)}>Download</button>

<style>
</style>
