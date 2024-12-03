import { Test, TestingModule } from '@nestjs/testing';
import { SocketController } from './socket.controller';

describe('SocketController', () => {
  let controller: SocketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocketController],
    }).compile();

    controller = module.get<SocketController>(SocketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
