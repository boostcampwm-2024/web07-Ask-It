import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { SessionAuthDto } from './dto/session-auth.dto';
import { UpdateHostDto } from './dto/update-host.dto';
import { SessionsAuthRepository } from './sessions-auth.repository';
import { SessionsAuthService } from './sessions-auth.service';

import { SessionsRepository } from '@sessions/sessions.repository';

describe('SessionsAuthService', () => {
  let service: SessionsAuthService;
  let sessionsAuthRepository: jest.Mocked<SessionsAuthRepository>;
  let sessionsRepository: jest.Mocked<SessionsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsAuthService,
        {
          provide: SessionsAuthRepository,
          useValue: {
            generateToken: jest.fn(),
            findTokenByUserId: jest.fn(),
            findTokenByUserIdAndToken: jest.fn(),
            findTokenByToken: jest.fn(),
            findUsersBySessionId: jest.fn(),
            updateIsHost: jest.fn(),
            findByToken: jest.fn(),
          },
        },
        {
          provide: SessionsRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SessionsAuthService>(SessionsAuthService);
    sessionsAuthRepository = module.get(SessionsAuthRepository);
    sessionsRepository = module.get(SessionsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateOrCreateToken', () => {
    it('should generate a new token if token is not provided', async () => {
      const data: SessionAuthDto = { sessionId: '123', token: null };
      sessionsAuthRepository.generateToken.mockResolvedValue('newToken');

      const result = await service.validateOrCreateToken(data, 1);

      expect(sessionsAuthRepository.generateToken).toHaveBeenCalledWith(1, '123');
      expect(result).toBe('newToken');
    });

    it('should return existing token if token is provided', async () => {
      const data: SessionAuthDto = { sessionId: '123', token: 'existingToken' };
      sessionsAuthRepository.findTokenByUserIdAndToken.mockResolvedValue('existingToken');

      const result = await service.validateOrCreateToken(data, 1);

      expect(sessionsAuthRepository.findTokenByUserIdAndToken).toHaveBeenCalledWith(1, '123', 'existingToken');
      expect(result).toBe('existingToken');
    });
  });

  describe('findUsers', () => {
    it('should return users with isHost status', async () => {
      sessionsAuthRepository.findUsersBySessionId.mockResolvedValue([
        {
          user: { userId: 1, nickname: 'User1' },
          isHost: true,
          token: 'someGeneratedToken',
          userId: 1,
          sessionId: 'someSessionId',
        },
        {
          user: { userId: 2, nickname: 'User2' },
          isHost: false,
          token: 'someGeneratedToken',
          userId: 1,
          sessionId: 'someSessionId',
        },
      ]);

      const result = await service.findUsers('123');

      expect(sessionsAuthRepository.findUsersBySessionId).toHaveBeenCalledWith('123');
      expect(result).toEqual([
        { userId: 1, nickname: 'User1', isHost: true },
        { userId: 2, nickname: 'User2', isHost: false },
      ]);
    });
  });

  describe('authorizeHost', () => {
    it('should authorize a new host', async () => {
      const updateHostDto: UpdateHostDto = { sessionId: '123', isHost: true, token: 'superHostToken' };
      sessionsAuthRepository.findTokenByUserId.mockResolvedValue('targetToken');
      sessionsAuthRepository.updateIsHost.mockResolvedValue({
        user: {
          userId: 2,
          createdAt: new Date(),
          email: 'user2@example.com',
          password: 'securePassword123',
          nickname: 'User2',
        },
        isHost: true,
      });
      jest.spyOn(service, 'validateSuperHost').mockResolvedValue(true);

      const result = await service.authorizeHost(2, updateHostDto);

      expect(service.validateSuperHost).toHaveBeenCalledWith('123', 'superHostToken');
      expect(sessionsAuthRepository.updateIsHost).toHaveBeenCalledWith('targetToken', true);
      expect(result).toEqual({ userId: 2, nickname: 'User2', isHost: true });
    });

    it('should throw ForbiddenException if user is not super host', async () => {
      const updateHostDto: UpdateHostDto = { sessionId: '123', isHost: true, token: 'invalidToken' };
      jest.spyOn(service, 'validateSuperHost').mockResolvedValue(false);

      await expect(service.authorizeHost(2, updateHostDto)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if target token is not found', async () => {
      const updateHostDto: UpdateHostDto = { sessionId: '123', isHost: true, token: 'superHostToken' };
      sessionsAuthRepository.findTokenByUserId.mockResolvedValue(null);
      jest.spyOn(service, 'validateSuperHost').mockResolvedValue(true);

      await expect(service.authorizeHost(2, updateHostDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if trying to change own role', async () => {
      const updateHostDto: UpdateHostDto = { sessionId: '123', isHost: true, token: 'targetToken' };
      sessionsAuthRepository.findTokenByUserId.mockResolvedValue('targetToken');
      jest.spyOn(service, 'validateSuperHost').mockResolvedValue(true);

      await expect(service.authorizeHost(2, updateHostDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('validateSuperHost', () => {
    it('should return true if user is the session creator', async () => {
      sessionsAuthRepository.findByToken.mockResolvedValue({
        sessionId: '123',
        token: 'token',
        userId: 1,
        isHost: true,
      });
      sessionsRepository.findById.mockResolvedValue({
        sessionId: '123',
        createUserId: 1,
        expiredAt: new Date(),
        createdAt: new Date(),
        title: 'asdasdsd',
      });

      const result = await service.validateSuperHost('123', 'token');

      expect(result).toBe(true);
    });

    it('should return false if user is not the session creator', async () => {
      sessionsRepository.findById.mockResolvedValue({
        sessionId: '123',
        title: 'Test Session',
        expiredAt: new Date(),
        createdAt: new Date(),
        createUserId: 1,
      });
      sessionsAuthRepository.findByToken.mockResolvedValue({
        token: 'token',
        userId: 2,
        sessionId: '123',
        isHost: false,
      });

      const result = await service.validateSuperHost('123', 'token');

      expect(result).toBe(false);
    });
  });
});
