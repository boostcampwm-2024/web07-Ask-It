import { Test, TestingModule } from '@nestjs/testing';

import { SessionsAuthController } from './sessions-auth.controller';

describe('SessionsAuthController', () => {
  let controller: SessionsAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsAuthController],
    }).compile();

    controller = module.get<SessionsAuthController>(SessionsAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
