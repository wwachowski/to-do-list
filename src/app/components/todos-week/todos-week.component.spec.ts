import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosWeekComponent } from './todos-week.component';

describe('TodosWeekComponent', () => {
  let component: TodosWeekComponent;
  let fixture: ComponentFixture<TodosWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosWeekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
