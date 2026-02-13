//generic-editor.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Word, ChineseWord, JapaneseWord, ItalianWord, RussianWord, GrammarCategory } from '../../models/word.model';
import { ChineseSection } from '../chinese/chinese-section';
import { JapaneseSection } from '../japanese/japanese-section';

@Component({
	selector: 'generic-editor',
	standalone: true,
	imports: [FormsModule, CommonModule,
		ChineseSection, JapaneseSection
	],
	templateUrl: './generic-editor.html',
	styleUrls: ['./generic-editor.css']
})
export class GenericEditor {
	@Input() language: 'Chinese' | 'Japanese' | 'Italian' | 'Russian' | 'English' | 'French' | 'generic' = 'generic';
	@Output() wordCreated = new EventEmitter<Word>();

	// -----------------
	// Common fields
	// -----------------
	key = '';
	grammar: GrammarCategory | GrammarCategory[] = 'noun';

	// English only
	englishSynonyms: string = '';

	// Chinese fields
	tempChinese?: ChineseWord;

	// Japanese fields
	tempJapanese?: JapaneseWord;

	// -----------------
	// Italian fields
	// -----------------
	italianNative = '';
	isMale: boolean = true; // toggle for gender

	// -----------------
	// Russian fields
	// -----------------
	russianNative = '';
	russianTransliteration = '';
	russianPronunciation = '';

	// -----------------
	// GETTERS for warnings
	// -----------------
	get showWarning(): boolean {
		return this.language === 'French';
	}

	get warningMessage(): string {
		if (this.language === 'English') return "";
		return "Sorry, the developer never studied " + this.language + " 😅";
	}

	// -----------------
	// Reset form
	// -----------------
	resetForm() {
		this.key = '';
		this.grammar = 'noun';

		this.englishSynonyms = '';

		this.isMale = true;
		this.italianNative = '';

		this.russianNative = '';
		this.russianTransliteration = '';
		this.russianPronunciation = '';
	}

	// -----------------
	// Submit form
	// -----------------
	submittedWord: Word | null = null;
	submit() {
		const newWord = new Word({
			key: this.key,
			grammar: this.grammar,
		});

		switch (this.language) {
			case 'English':
				newWord.synonyms = this.englishSynonyms
					.split(',')
					.map(s => s.trim())
					.filter(s => s);
				break;

			case 'Chinese':
				newWord.chinese = this.tempChinese;
				break;

			case 'Japanese':
				newWord.japanese = this.tempJapanese;
				break;

			case 'Italian':
				newWord.italian = {
					native: this.italianNative,
					gender: this.isMale ? 'm' : 'f'
				} as ItalianWord;
				break;

			case 'Russian':
				newWord.russian = {
					native: this.russianNative,
					transliteration: this.russianTransliteration || undefined,
					pronunciation: this.russianPronunciation || undefined
				} as RussianWord;
				break;

			default:
				break;
		}

		this.wordCreated.emit(newWord);
		
		// ✅ store the last submitted word for inspection
		this.submittedWord = newWord;

		console.log('Submitting key:', this.key, 'grammar:', this.grammar);
		
		this.resetForm();
	}
}
