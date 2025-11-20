import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Russian } from './russian';

describe('Russian', () => {
  let component: Russian;
  let fixture: ComponentFixture<Russian>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Russian]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Russian);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
