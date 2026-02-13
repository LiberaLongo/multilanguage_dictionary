//chinese-section.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChineseWord } from '../../models/word.model';

@Component({
	selector: 'chinese-section',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
		<h3>
			Chinese
			<img src="Chinese.png" alt="Chinese flag" height="50px">
			Tones
			<img src="tones.png" height="50px"
				alt="chinese tones from 0 neutral, 1 red, 2 green, 3 blue, 4 purple"/>
		</h3>

		<label>
			Insert Chinese word (汉字):
			<input type="text" [(ngModel)]="native">
		</label>
		<br>

		<label>
			Pinyin (tone marks):
			<input type="text" [(ngModel)]="pinyin">
		</label>
		<br>

		<label>
			Numbered Pinyin:
			<input type="text"
					[(ngModel)]="pinyinNumbered"
					(ngModelChange)="autoFillFromNumbered()">
		</label>
		<br>

		<label>
			Transliteration (ASCII-only):
			<input type="text"
					[(ngModel)]="transliteration"
					(ngModelChange)="autoFillFromTransliteration()">
		</label>
		<br>
	`
})
export class ChineseSection {

	@Input() data?: ChineseWord;
	@Output() dataChange = new EventEmitter<ChineseWord>();

	native = '';
	pinyin = '';
	pinyinNumbered = '';
	transliteration = '';

	ngOnChanges() {
		if (this.data) {
			this.native = this.data.native ?? '';
			this.pinyin = this.data.pinyin ?? '';
			this.pinyinNumbered = this.data.pinyinNumbered ?? '';
			this.transliteration = this.data.transliteration ?? '';
		}
	}

	private emitChange() {
		this.dataChange.emit({
			native: this.native,
			pinyin: this.pinyin || undefined,
			pinyinNumbered: this.pinyinNumbered || undefined,
			transliteration: this.transliteration || undefined
		});
	}

	autoFillFromNumbered() {
		if (!this.pinyin && this.pinyinNumbered) {
			this.pinyin = this.pinyinNumbered; // later you can convert to tone marks
		}
		this.emitChange();
	}

	autoFillFromTransliteration() {
		if (!this.pinyin && this.transliteration) {
			this.pinyin = this.transliteration;
		}
		this.emitChange();
	}
}
