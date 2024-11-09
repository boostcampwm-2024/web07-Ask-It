import { Test, TestingModule } from '@nestjs/testing';

import { SessionsAuthService } from './sessions-auth.service';

describe('SessionsAuthService', () => {
  let service: SessionsAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionsAuthService],
    }).compile();

    service = module.get<SessionsAuthService>(SessionsAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
