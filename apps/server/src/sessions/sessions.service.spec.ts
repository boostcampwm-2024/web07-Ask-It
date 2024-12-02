import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';

import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

describe('SessionsService', () => {
  let service: SessionsService;
  let sessionRepository: jest.Mocked<SessionsRepository>;
  let sessionsAuthRepository: jest.Mocked<SessionsAuthRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        {
          provide: SessionsRepository,
          useValue: {
            create: jest.fn(),
            getSessionsById: jest.fn(),
            findById: jest.fn(),
            updateSessionExpiredAt: jest.fn(),
          },
        },
        {
          provide: SessionsAuthRepository,
          useValue: {
            generateToken: jest.fn(),
            findByToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
    sessionRepository = module.get(SessionsRepository);
    sessionsAuthRepository = module.get(SessionsAuthRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a session and generate a token', async () => {
      const title = 'Test Session';
      const userId = 1;
      const sessionId = '123';
      const data: CreateSessionDto = { title, sessionId };

      const createdSession = {
        sessionId,
        title,
        createdAt: new Date(),
        expiredAt: new Date(),
        createUserId: userId,
      };
      sessionRepository.create.mockResolvedValue(createdSession);
      sessionsAuthRepository.generateToken.mockResolvedValue('mockToken');

      const result = await service.create(data, userId);

      expect(sessionRepository.create).toHaveBeenCalledWith({
        ...data,
        expiredAt: expect.any(Date),
        user: { connect: { userId } },
      });
      expect(sessionsAuthRepository.generateToken).toHaveBeenCalledWith(userId, sessionId, true);
      expect(result).toEqual({ sessionId });
    });
  });

  describe('getSessionsById', () => {
    it('should retrieve and transform session data', async () => {
      const userId = 2;
      const sessionData = [
        {
          sessionId: '123123',
          title: 'Test Session',
          createdAt: new Date('2024-01-01'),
          expiredAt: new Date('2024-01-08'),
        },
        {
          sessionId: '123',
          title: 'Test Session',
          createdAt: new Date('2024-01-01'),
          expiredAt: new Date('2024-01-08'),
        },
      ];

      sessionRepository.getSessionsById.mockResolvedValue(sessionData);

      const result = await service.getSessionsById(userId);

      expect(sessionRepository.getSessionsById).toHaveBeenCalledWith(userId);
      expect(result).toEqual([
        {
          sessionId: '123123',
          title: 'Test Session',
          createdAt: { year: 2024, month: 1, date: 1 },
          expired: true,
        },
        {
          sessionId: '123',
          title: 'Test Session',
          createdAt: { year: 2024, month: 1, date: 1 },
          expired: true,
        },
      ]);
    });
  });

  describe('terminateSession', () => {
    it('should terminate a session if the user is authorized', async () => {
      const sessionId = '123';
      const token = 'mockToken';
      const sessionData = {
        createUserId: 1,
        sessionId: '123',
        createdAt: new Date(),
        title: 'Test Session',
        expiredAt: new Date(),
      };
      const tokenData = { userId: 1, isHost: true, token, sessionId };

      sessionRepository.findById.mockResolvedValue(sessionData);
      sessionsAuthRepository.findByToken.mockResolvedValue(tokenData);

      const result = await service.terminateSession(sessionId, token);

      expect(sessionRepository.findById).toHaveBeenCalledWith(sessionId);
      expect(sessionsAuthRepository.findByToken).toHaveBeenCalledWith(token);
      expect(sessionRepository.updateSessionExpiredAt).toHaveBeenCalledWith(sessionId, expect.any(Date));
      expect(result).toEqual({ expired: true });
    });

    it('should throw ForbiddenException if the user is not authorized', async () => {
      const sessionId = '123';
      const token = 'mockToken';
      const sessionData = {
        createUserId: 1,
        sessionId: '123',
        createdAt: new Date(),
        title: 'Test Session',
        expiredAt: new Date(),
      };
      sessionRepository.findById.mockResolvedValue(sessionData);
      sessionsAuthRepository.findByToken.mockResolvedValue({
        sessionId: 'test-session-id',
        userId: 2,
        token: 'test-token',
        isHost: true,
      });

      await expect(service.terminateSession(sessionId, token)).rejects.toThrow(ForbiddenException);
    });
  });
});
