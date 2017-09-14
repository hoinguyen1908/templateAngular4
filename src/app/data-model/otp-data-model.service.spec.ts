import { TestBed, inject } from '@angular/core/testing';

import { OtpDataModelService } from './otp-data-model.service';

describe('OtpDataModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtpDataModelService]
    });
  });

  it('should be created', inject([OtpDataModelService], (service: OtpDataModelService) => {
    expect(service).toBeTruthy();
  }));
});
