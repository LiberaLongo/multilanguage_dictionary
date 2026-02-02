import Dexie, { Table } from 'dexie';
import { Word } from '../models/word.model';

export class AppDatabase extends Dexie {
	words!: Table<Word, string>;

	constructor() {
		super('dictionaryDB');

		this.version(1).stores({
			words: '++_id, key, *searchIndex'
		});
	}
}

export const db = new AppDatabase();
