import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Japanese } from './japanese';

describe('Japanese', () => {
  let component: Japanese;
  let fixture: ComponentFixture<Japanese>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Japanese]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Japanese);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
