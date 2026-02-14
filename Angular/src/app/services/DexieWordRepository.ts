//DexieWordRepository.ts
import { Injectable } from "@angular/core";
import { GrammarCategory, Word } from "../models/word.model";
import { WordSearch } from "../models/wordSearch";
import { WordRepository } from "./wordRepository";
import { db } from "./database";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DexieWordRepository implements WordRepository {

	// INPORT EXPORT
	async export(): Promise<Word[]> {
		return db.words.toArray();
	}
	async import(words: Word[]): Promise<void> {
		const rebuilt = words.map(w => {
			const word = new Word(w);
			word.buildSearchIndex();
			return word;
		});
			
		await db.words.bulkPut(rebuilt);
	}

	private words$ = new BehaviorSubject<Word[]>([]);

	getWords(): Observable<Word[]> {
		return this.words$.asObservable();
	}
	// CRUD
	async update(word: Word) {
		word.buildSearchIndex();
		await db.words.put(word);
	}
	async delete(id: string) {
		await db.words.delete(id);
	}
	async getById(id: string): Promise<Word | null> {
		const word = await db.words.get(id);
		return word ?? null;
	}
	
	//SEARCH
	async search(query: WordSearch): Promise<Word[]> {
		let collection = db.words.toCollection();
		
		// 1️⃣ TEXT SEARCH
		if (query.text?.text) {
			const text = query.text.text.toLowerCase();
		
			collection = db.words
			.where('searchIndex')
			.startsWith(text);
		}
		
		// 2️⃣ GRAMMAR FILTER
		if (query.grammar) {
			const grammars = Array.isArray(query.grammar)
			? query.grammar
			: [query.grammar];
		
			collection = collection.filter((word: Word) =>
				Array.isArray(word.grammar)
					? word.grammar.some(g => grammars.includes(g))
					: grammars.includes(word.grammar as GrammarCategory)
			  );
			  
		}
		
		// 3️⃣ LANGUAGE FILTER
		if (query.languages) {
			collection = collection.filter((word: Word)=> {
				if (query.languages?.chinese && !word.chinese) return false;
				if (query.languages?.italian && !word.italian) return false;
				if (query.languages?.japanese && !word.japanese) return false;
				if (query.languages?.russian && !word.russian) return false;
				return true;
			});
		}
		
		// 4️⃣ NOTES / EXAMPLES
		if (query.hasNotes !== undefined) {
			collection = collection.filter((word: any) =>
			query.hasNotes
				? this.hasAnyNotes(word)
				: !this.hasAnyNotes(word)
			);
		}
		
		if (query.hasExamples !== undefined) {
			collection = collection.filter((word: any) =>
			query.hasExamples
				? this.hasAnyExamples(word)
				: !this.hasAnyExamples(word)
			);
		}
		
		// 5️⃣ + 6️⃣ SORT + PAGINATION (insieme)
		let result = await collection.toArray();

		if (query.sortBy === 'key') {
			result.sort((a: { key: string; }, b: { key: string; }) =>
				query.sortDirection === 'desc'
				? b.key.localeCompare(a.key)
				: a.key.localeCompare(b.key)
			);
		}

		const offset = query.offset ?? 0;
		const limit = query.limit ?? result.length;

		return result.slice(offset, offset + limit);
	}
	//helpers
	hasAnyNotes(word: Word): boolean {
		return Boolean(
			word.chinese?.notes?.length ||
			word.italian?.notes?.length ||
			word.japanese?.notes?.length ||
			word.russian?.notes?.length
		);
	}
	hasAnyExamples(word: Word): boolean {
		return Boolean(
			word.chinese?.examples?.length ||
			word.italian?.examples?.length ||
			word.japanese?.examples?.length ||
			word.russian?.examples?.length
		);
	}

	async getAll(): Promise<Word[]> {
		const allWords = await db.words.toArray();
		console.log('getAll() returning words:', allWords);
		this.words$.next(allWords);
		return allWords;
	}	
	
	async getByLanguage(language: string): Promise<Word[]> {
		// just call getAll() — no need to filter here
		return this.getAll();
	}
	
	async add(word: Word) {
		console.log('Adding word to DB:', word);
		word.buildSearchIndex();
		await db.words.add(word);
		const allWords = await db.words.toArray();
		console.log('All words after add:', allWords);
		this.words$.next(allWords);
	}
		
}
