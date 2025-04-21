import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagInputFieldComponent } from './tag-input-field.component';

describe('TagInputFieldComponent', () => {
  let component: TagInputFieldComponent;
  let fixture: ComponentFixture<TagInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagInputFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
