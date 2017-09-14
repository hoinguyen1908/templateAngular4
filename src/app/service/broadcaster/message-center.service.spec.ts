import { TestBed, inject } from '@angular/core/testing';

import { MessageCenterService } from './message-center.service';

describe('MessageCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageCenterService]
    });
  });

  it('should be created', inject([MessageCenterService], (service: MessageCenterService) => {
    expect(service).toBeTruthy();
  }));
});
