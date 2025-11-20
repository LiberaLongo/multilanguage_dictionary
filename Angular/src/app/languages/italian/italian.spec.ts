import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Italian } from './italian';

describe('Italian', () => {
  let component: Italian;
  let fixture: ComponentFixture<Italian>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Italian]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Italian);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
