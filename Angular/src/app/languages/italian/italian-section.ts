import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItalianWord } from '../../models/word.model';

@Component({
	selector: 'italian-section',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
		<h3>Italian
			<img src="Italian.png" alt="Italian flag" height="50px">
		</h3>

		<label>
			Insert Italian word:
			<input type="text" [(ngModel)]="native" name="native" required>
		</label>
		<br>
		<label>
			Gender:
			<input type="checkbox" [(ngModel)]="isMale" name="genderToggle">
			{{ isMale ? 'Male (m)' : 'Female (f)' }}
		</label>
		<br>
	`
})
export class ItalianSection {

	@Input() data?: ItalianWord;
	@Output() dataChange = new EventEmitter<ItalianWord>();

	native = '';
	gender = 'm';
	isMale: boolean = true; // toggle for gender

	ngOnChanges() {
		if (this.data) {
			this.native = this.data.native ?? '';
			this.gender = this.data.gender ?? (this.isMale? 'm' : 'f');
		}
	}

	private emitChange() {
		this.dataChange.emit({
			native: this.native,
			gender: this.gender as 'm' | 'f'
		});
	}
}
