import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericEditor } from './generic-editor';

describe('GenericEditor', () => {
  let component: GenericEditor;
  let fixture: ComponentFixture<GenericEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
