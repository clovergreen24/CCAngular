import { TestBed } from '@angular/core/testing';

import { CategoriaServiceService } from './categoria.service';

describe('CategoriaService', () => {
  let service: CategoriaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
