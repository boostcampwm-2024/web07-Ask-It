import { Test, TestingModule } from '@nestjs/testing';

import { ChatsRepository } from './chats.repository';
import { ChatSaveDto, ChatsService } from './chats.service';

describe('ChatsService', () => {
  let service: ChatsService;
  let chatsRepository: jest.Mocked<ChatsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsService,
        {
          provide: ChatsRepository,
          useValue: {
            save: jest.fn(),
            getChatsForInfiniteScroll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChatsService>(ChatsService);
    chatsRepository = module.get(ChatsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('saveChat', () => {
    it('should save the chat and return the saved data', async () => {
      const data: ChatSaveDto = { sessionId: '123', token: 'mockToken', body: 'Test message' };

      const mockUser = {
        userId: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        nickname: 'TestUser',
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
      };

      const savedChat = {
        chattingId: 1,
        sessionId: 'test-session',
        createUserToken: 'mockToken',
        body: 'Test chat message',
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        createUserTokenEntity: {
          user: mockUser,
        },
      };

      chatsRepository.save.mockResolvedValue(savedChat);

      const result = await service.saveChat(data);
      expect(chatsRepository.save).toHaveBeenCalledWith(data);
      expect(result).toEqual({
        chattingId: 1,
        nickname: 'TestUser',
        content: 'Test chat message',
      });
    });

    it('should return "익명" if the user has no nickname', async () => {
      const data: ChatSaveDto = { sessionId: '123', token: 'mockToken', body: 'Test message' };

      const savedChatWithNoNickname = {
        chattingId: 1,
        createUserTokenEntity: {
          user: {
            createdAt: new Date(),
            userId: 123,
            email: 'user@example.com',
            password: 'password',
            nickname: null,
          },
        },
        createUserToken: 'token123',
        sessionId: 'session123',
        body: 'Test message',
        createdAt: new Date(),
      };

      chatsRepository.save.mockResolvedValue(savedChatWithNoNickname);

      const result = await service.saveChat(data);

      expect(chatsRepository.save).toHaveBeenCalledWith(data);

      expect(result).toEqual({
        chattingId: 1,
        nickname: '익명',
        content: 'Test message',
      });
    });
  });

  describe('getChatsForInfiniteScroll', () => {
    it('should retrieve chats for infinite scroll', async () => {
      const sessionId = '123';
      const count = 10;
      const chatId = 5;

      const chatData = [
        {
          chattingId: 10,
          createUserToken: 'token1',
          body: 'Message 1',
          createdAt: new Date(),
          sessionId: '123',
          createUserTokenEntity: {
            user: {
              userId: 1,
              createdAt: new Date(),
              email: 'user1@example.com',
              password: 'password1',
              nickname: 'User1',
            },
            token: 'token1',
            userId: 1,
            sessionId: '123',
            isHost: true,
          },
        },
        {
          chattingId: 9,
          createUserToken: 'token2',
          body: 'Message 2',
          createdAt: new Date(),
          sessionId: '123',
          createUserTokenEntity: {
            user: {
              userId: 2,
              createdAt: new Date(),
              email: 'user2@example.com',
              password: 'password2',
              nickname: 'User2',
            },
            token: 'token2',
            userId: 2,
            sessionId: '123',
            isHost: false,
          },
        },
      ];

      chatsRepository.getChatsForInfiniteScroll.mockResolvedValue(chatData);

      const result = await service.getChatsForInfiniteScroll(sessionId, count, chatId);

      expect(result).toEqual([
        { chattingId: 10, nickname: 'User1', content: 'Message 1' },
        { chattingId: 9, nickname: 'User2', content: 'Message 2' },
      ]);
    });

    it('should return "익명" if the user has no nickname', async () => {
      const sessionId = '123';
      const count = 10;
      const chatId = 5;

      const chatData = [
        {
          chattingId: 10,
          body: 'Message 1',
          createUserToken: 'token1',
          createdAt: new Date(),
          sessionId: '123',
          createUserTokenEntity: {
            user: {
              userId: 1,
              createdAt: new Date(),
              email: 'test@example.com',
              password: 'password',
              nickname: null,
            },
            token: 'token1',
            userId: 1,
            sessionId: '123',
            isHost: false,
          },
        },
      ];

      chatsRepository.getChatsForInfiniteScroll.mockResolvedValue(chatData);

      const result = await service.getChatsForInfiniteScroll(sessionId, count, chatId);

      expect(result).toEqual([{ chattingId: 10, nickname: '익명', content: 'Message 1' }]);
    });
  });
});
