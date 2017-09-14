import { TestBed, inject } from '@angular/core/testing';

import { AuthDataModelService } from './auth-data-model.service';

describe('AuthDataModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDataModelService]
    });
  });

  it('should be created', inject([AuthDataModelService], (service: AuthDataModelService) => {
    expect(service).toBeTruthy();
  }));
});
