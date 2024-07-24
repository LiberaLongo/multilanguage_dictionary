//utils.js

export const languages = [
	{ id: "English", myself: "English", pronunciation: false},
	{ id: "Italian", myself: "Italiano", pronunciation: false},
	{ id: "Chinese", myself: "汉语", pronunciation: true},
	{ id: "Japanese", myself: "日本語", pronunciation: true},
	{ id: "German", myself: "Deutsch", pronunciation: false},
	{ id: "Russian", myself: "Русский", pronunciation: false},
	{ id: "French", myself: "Français", pronunciation: false},
];

// Funzione per scaricare il file JSON
export function downloadJSON(data, name) {
	// Converti i dati in formato JSON
	const jsonData = JSON.stringify(data, null, 2);
	// Crea un blob con i dati JSON
	const blob = new Blob([jsonData], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	// Crea un link e simulare un clic per scaricare il file
	const a = document.createElement('a');
	a.href = url;
	a.download = name;
	a.click();
	// Libera l'URL oggetto
	URL.revokeObjectURL(url);
}

