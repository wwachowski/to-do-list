import { TestBed } from '@angular/core/testing';

import { TodoViewConfigService } from './todo-view-config.service';

describe('TodoViewConfigService', () => {
  let service: TodoViewConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoViewConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
