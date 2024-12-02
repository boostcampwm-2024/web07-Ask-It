import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Reply } from '@prisma/client';

import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyBodyDto } from './dto/update-reply.dto';
import { RepliesRepository } from './replies.repository';
import { RepliesService } from './replies.service';

import { SessionsRepository } from '@sessions/sessions.repository';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

describe('RepliesService', () => {
  let service: RepliesService;
  let repliesRepository: jest.Mocked<RepliesRepository>;
  let sessionsRepository: jest.Mocked<SessionsRepository>;
  let sessionAuthRepository: jest.Mocked<SessionsAuthRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepliesService,
        {
          provide: RepliesRepository,
          useValue: {
            createReply: jest.fn(),
            updateBody: jest.fn(),
            deleteReply: jest.fn(),
            findLike: jest.fn(),
            createLike: jest.fn(),
            deleteLike: jest.fn(),
            getLikesCount: jest.fn(),
          },
        },
        {
          provide: SessionsRepository,
          useValue: {},
        },
        {
          provide: SessionsAuthRepository,
          useValue: {
            findByToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RepliesService>(RepliesService);
    repliesRepository = module.get(RepliesRepository);
    sessionsRepository = module.get(SessionsRepository);
    sessionAuthRepository = module.get(SessionsAuthRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReply', () => {
    it('should create a new reply and return formatted data', async () => {
      const createReplyDto: CreateReplyDto = { body: 'Test reply', questionId: 1, token: 'token', sessionId: '123' };
      repliesRepository.createReply.mockResolvedValue({
        replyId: 1,
        body: 'Test reply',
        createdAt: new Date(),
        createUserTokenEntity: {
          user: {
            userId: 1,
            nickname: 'TestUser',
            email: 'yuyu@naver.com',
            password: 'password',
            createdAt: new Date(),
          },
        },
        deleted: false,
        questionId: 1,
        createUserToken: 'token',
        sessionId: '123',
      });

      const result = await service.createReply(createReplyDto);

      expect(repliesRepository.createReply).toHaveBeenCalledWith(createReplyDto);
      expect(result).toEqual({
        userId: 1,
        replyId: 1,
        body: 'Test reply',
        createdAt: expect.any(Date),
        isOwner: true,
        likesCount: 0,
        liked: false,
        deleted: false,
        questionId: 1,
        nickname: 'TestUser',
      });
    });
  });

  describe('updateBody', () => {
    it('should update the reply body', async () => {
      const replyId = 1;
      const updateReplyBodyDto: UpdateReplyBodyDto = { body: 'Updated reply', token: 'token', sessionId: '123' };
      repliesRepository.updateBody.mockResolvedValue({
        replyId,
        body: 'Updated reply',
        sessionId: '123',
        createUserToken: 'token',
        questionId: 1,
        createdAt: new Date('2024-12-02T09:40:17.170Z'),
        deleted: false,
      });

      const result = await service.updateBody(replyId, updateReplyBodyDto);

      expect(repliesRepository.updateBody).toHaveBeenCalledWith(replyId, 'Updated reply');
      expect(result).toEqual({
        replyId,
        body: 'Updated reply',
        sessionId: '123',
        createUserToken: 'token',
        questionId: 1,
        createdAt: new Date('2024-12-02T09:40:17.170Z'),
        deleted: false,
      });
    });
  });

  describe('deleteReply', () => {
    it('should delete a reply if user is authorized', async () => {
      const replyId = 1;
      const token = 'validToken';
      const reply: Reply = {
        replyId,
        body: 'Test',
        createUserToken: 'validToken',
        createdAt: new Date(),
        deleted: false,
        questionId: 1,
        sessionId: '123',
      };

      sessionAuthRepository.findByToken.mockResolvedValue({ sessionId: '123', token: token, isHost: false, userId: 1 });

      const result = await service.deleteReply(replyId, token, reply);

      expect(repliesRepository.deleteReply).toHaveBeenCalledWith(replyId);
      expect(result).toBeUndefined();
    });

    it('should throw ForbiddenException if user is not authorized', async () => {
      const replyId = 1;
      const token = 'invalidToken';
      const reply: Reply = {
        replyId,
        body: 'Test',
        createUserToken: 'validToken',
        createdAt: new Date(),
        deleted: false,
        questionId: 1,
        sessionId: '123',
      };

      sessionAuthRepository.findByToken.mockResolvedValue({ sessionId: '123', token: token, isHost: false, userId: 1 });

      await expect(service.deleteReply(replyId, token, reply)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('toggleLike', () => {
    it('should toggle like status for a reply', async () => {
      const replyId = 1;
      const createUserToken = 'token';
      repliesRepository.findLike.mockResolvedValue(null);
      repliesRepository.createLike.mockResolvedValue({
        replyLikeId: 1,
        replyId,
        createUserToken,
        reply: {
          replyId,
          createUserToken,
          createdAt: new Date(),
          deleted: false,
          questionId: 1,
          body: 'hihi',
          sessionId: '123',
        },
      });

      const result = await service.toggleLike(replyId, createUserToken);

      expect(repliesRepository.findLike).toHaveBeenCalledWith(replyId, createUserToken);
      expect(repliesRepository.createLike).toHaveBeenCalledWith(replyId, createUserToken);
      expect(result).toEqual({ liked: true, questionId: 1 });
    });

    it('should remove like if it already exists', async () => {
      const replyId = 1;
      const createUserToken = 'token';
      repliesRepository.findLike.mockResolvedValue({
        replyId,
        createUserToken,
        replyLikeId: 1,
      });
      repliesRepository.deleteLike.mockResolvedValue({
        replyLikeId: 1,
        replyId,
        createUserToken,
        reply: {
          replyId,
          createUserToken,
          createdAt: new Date(),
          deleted: false,
          questionId: 1,
          body: 'hihi',
          sessionId: '123',
        },
      });

      const result = await service.toggleLike(replyId, createUserToken);

      expect(repliesRepository.findLike).toHaveBeenCalledWith(replyId, createUserToken);
      expect(repliesRepository.deleteLike).toHaveBeenCalledWith(1);
      expect(result).toEqual({ liked: false, questionId: 1 });
    });
  });

  describe('getLikesCount', () => {
    it('should return the number of likes for a reply', async () => {
      const replyId = 1;
      repliesRepository.getLikesCount.mockResolvedValue(10);

      const result = await service.getLikesCount(replyId);

      expect(repliesRepository.getLikesCount).toHaveBeenCalledWith(replyId);
      expect(result).toBe(10);
    });
  });
});
