import { TestBed } from '@angular/core/testing';

import { BelvoService } from './belvo.service';

describe('BelvoService', () => {
  let service: BelvoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BelvoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
