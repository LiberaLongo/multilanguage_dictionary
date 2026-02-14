import { Word } from "../models/word.model";
import { WordSearch } from "../models/wordSearch";

export interface WordRepository {
	
	add(word: Word): Promise<void>;
	update(word: Word): Promise<void>;
	delete(id: string): Promise<void>;
	getById(id: string): Promise<Word | null>;
	search(query: WordSearch): Promise<Word[]>;

	export(): Promise<Word[]>;
	import(words: Word[]): Promise<void>;

	getByLanguage(language: string): Word[] | PromiseLike<Word[]>;
	getAll(): Word[] | PromiseLike<Word[]>
}
