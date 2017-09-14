import { TestBed, inject } from '@angular/core/testing';

import { SocketDataService } from './socket-data.service';

describe('SocketDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketDataService]
    });
  });

  it('should be created', inject([SocketDataService], (service: SocketDataService) => {
    expect(service).toBeTruthy();
  }));
});
