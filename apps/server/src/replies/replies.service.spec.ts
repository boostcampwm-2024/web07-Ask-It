import { Test, TestingModule } from '@nestjs/testing';

import { RepliesService } from './replies.service';

describe('RepliesService', () => {
  let service: RepliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepliesService],
    }).compile();

    service = module.get<RepliesService>(RepliesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
