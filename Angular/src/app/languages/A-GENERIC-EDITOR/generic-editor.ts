//generic-editor.ts
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'generic-editor',
  imports: [FormsModule],
  templateUrl: './generic-editor.html',
  styleUrl: './generic-editor.css'
})
export class GenericEditor {
  @Input() language:string = "generic";
  key = "";
  word = "";
  pronun = "";

}
