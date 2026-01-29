// word.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from '../models/word.model';

@Injectable({ providedIn: 'root' })
export class WordService {
	private apiUrl = 'http://localhost:3000/words';

	constructor(private http: HttpClient) {}

	create(word: Word) {
		return this.http.post(this.apiUrl, word);
	}

	read() {
		return this.http.get<Word[]>(this.apiUrl);
	}

	update(id: string, word: Word) {
		return this.http.put(`${this.apiUrl}/${id}`, word);
	}

	delete(id: string) {
		return this.http.delete(`${this.apiUrl}/${id}`);
	}
}
