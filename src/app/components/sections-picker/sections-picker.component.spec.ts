import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsPickerComponent } from './sections-picker.component';

describe('SectionsPickerComponent', () => {
  let component: SectionsPickerComponent;
  let fixture: ComponentFixture<SectionsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionsPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
