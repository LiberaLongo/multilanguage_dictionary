// word-search.model.ts

import { GrammarCategory } from "./word.model";

export type TextMatchMode = 'exact' | 'startsWith' | 'contains' | 'regex';

export interface TextSearch {
	text: string;
	mode?: TextMatchMode;
	caseSensitive?: boolean;
	fields?: SearchField[];
}

export type SearchField =
	| 'key'
	| 'synonyms'
	| 'allKeys'
	| 'pinyin'
	| 'transliteration'
	| 'native';

export interface LanguageFilter {
	chinese?: boolean;
	italian?: boolean;
	japanese?: boolean;
	russian?: boolean;
}

export interface WordSearch {
	// free text search
	text?: TextSearch;

	// grammar filters
	grammar?: GrammarCategory | GrammarCategory[];

	// language presence
	languages?: LanguageFilter;

	// structural filters
	hasNotes?: boolean;
	hasExamples?: boolean;

	// pagination / UX
	limit?: number;
	offset?: number;

	// future-proof
	sortBy?: 'key' | 'createdAt';
	sortDirection?: 'asc' | 'desc';
}

/*
//ESEMPI

//🔍 Cerca “ci” in key e synonyms
{
  text: {
    text: 'ci',
    mode: 'startsWith',
    fields: ['allKeys']
  }
}

//🇨🇳 Solo parole con cinese + pinyin
{
  languages: { chinese: true },
  text: {
    text: 'ni',
    fields: ['pinyin', 'transliteration']
  }
}

//📚 Verbi con esempi
{
  grammar: 'verb',
  hasExamples: true
}

//🈯 Parole giapponesi (hiragana)
{
  languages: { japanese: true },
  text: {
    text: 'あ',
    fields: ['native']
  }
}


*/
