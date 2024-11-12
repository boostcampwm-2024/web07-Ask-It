import { Test, TestingModule } from '@nestjs/testing';

import { RepliesController } from './replies.controller';

describe('RepliesController', () => {
  let controller: RepliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepliesController],
    }).compile();

    controller = module.get<RepliesController>(RepliesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
