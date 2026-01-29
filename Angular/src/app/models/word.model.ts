//common part to every language
export interface LearningNote {
	type?: 'grammar' | 'usage' | 'culture';
	text: string;
}
export interface Example {
	sentence: string;
	explanation?: string;
}
interface BaseTranslation {
	native: string;
	notes?: LearningNote[];
	examples?: Example[];
}
export type GrammarCategory =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'particle'
  | 'classifier'
  | 'conjunction'
  | 'interjection'
  | 'proper-noun';

//languages structures
//Chinese
export interface ChineseWord extends BaseTranslation {
	pinyin?: string;          // "mā" with tone marks, can be filled later
	pinyinNumbered?: string;  // "ma1" etc           , for fast initial entry
	transliteration?: string; // ASCII-only "ma"     , search, convenience
}
//Italian
export interface ItalianWord extends BaseTranslation {
	gender?: 'm' | 'f';
}  
//Japanese
export interface JapaneseWord extends BaseTranslation {
	hiragana: string;
	katakana?: string;
}
//Russian
export interface RussianWord extends BaseTranslation {
	transliteration?: string; // dom → дом
	pronunciation?: string;  // optional IPA or simplified
}  

// word.model.ts
export class Word {
	//setted by the program (MongoDB)
	_id: string = "";

	//SEARCH WORDS
	// Main English key
	key!: string;
	// Optional synonyms
	synonyms: string[] = [];  
	// Combined array for easy search: key + synonyms
	get allKeys(): string[] {
		return [this.key, ...this.synonyms];
	}

	//grammar
	grammar!: GrammarCategory | GrammarCategory[];
	//languages
	chinese?: ChineseWord;
	italian?: ItalianWord;
	japanese?: JapaneseWord;
	russian?: RussianWord;

	constructor(init?: Partial<Word>) {
		Object.assign(this, init);
	}
}
