import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingFieldComponent } from './rating-field.component';

describe('RatingFieldComponent', () => {
  let component: RatingFieldComponent;
  let fixture: ComponentFixture<RatingFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
