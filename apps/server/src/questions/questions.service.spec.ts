import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { QuestionsRepository } from './questions.repository';
import { QuestionsService } from './questions.service';

import { RepliesRepository } from '@replies/replies.repository';
import { SessionsRepository } from '@sessions/sessions.repository';
import { SessionsAuthRepository } from '@sessions-auth/sessions-auth.repository';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let questionsRepository: jest.Mocked<QuestionsRepository>;
  let sessionsRepository: jest.Mocked<SessionsRepository>;
  let sessionsAuthRepository: jest.Mocked<SessionsAuthRepository>;
  let repliesRepository: jest.Mocked<RepliesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: QuestionsRepository,
          useValue: {
            create: jest.fn(),
            findQuestionsWithDetails: jest.fn(),
            findLike: jest.fn(),
            createLike: jest.fn(),
            deleteLike: jest.fn(),
            getLikesCount: jest.fn(),
            updateBody: jest.fn(),
            deleteQuestion: jest.fn(),
            updatePinned: jest.fn(),
            updateClosed: jest.fn(),
          },
        },
        {
          provide: SessionsRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: SessionsAuthRepository,
          useValue: {
            findHostTokensInSession: jest.fn(),
            findByToken: jest.fn(),
          },
        },
        {
          provide: RepliesRepository,
          useValue: {
            findReplyByQuestionId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
    questionsRepository = module.get(QuestionsRepository);
    sessionsRepository = module.get(SessionsRepository);
    sessionsAuthRepository = module.get(SessionsAuthRepository);
    repliesRepository = module.get(RepliesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createQuestion', () => {
    it('should create a question and return formatted response', async () => {
      const createQuestionDto = {
        sessionId: 'test-session',
        token: 'test-token',
        body: 'Test question',
      };

      const mockCreatedQuestion = {
        questionId: 1,
        createUserToken: 'test-token',
        sessionId: 'test-session',
        body: 'Test question',
        closed: false,
        pinned: false,
        createdAt: new Date(),
        createUserTokenEntity: {
          user: {
            userId: 1,
            nickname: 'TestUser',
            email: 'test@example.com',
            password: 'hashedPassword',
            createdAt: new Date(),
          },
        },
      };

      questionsRepository.create.mockResolvedValue(mockCreatedQuestion);

      const result = await service.createQuestion(createQuestionDto);

      expect(questionsRepository.create).toHaveBeenCalledWith(createQuestionDto);
      expect(result).toEqual({
        questionId: 1,
        createUserToken: 'test-token',
        sessionId: 'test-session',
        body: 'Test question',
        closed: false,
        pinned: false,
        createdAt: expect.any(Date),
        isOwner: true,
        likesCount: 0,
        liked: false,
        nickname: 'TestUser',
        replies: [],
      });
    });
  });

  describe('getQuestionsBySession', () => {
    it('should return questions with proper formatting', async () => {
      const mockData = {
        sessionId: 'test-session',
        token: 'test-token',
      };

      const mockQuestions = [
        {
          questionId: 1,
          sessionId: 'test-session',
          body: 'Test question',
          closed: false,
          pinned: false,
          createdAt: new Date('2024-12-02T09:40:17.170Z'),
          createUserToken: 'test-token',
          createUserTokenEntity: {
            user: {
              userId: 1,
              createdAt: new Date('2024-12-02T09:39:17.170Z'),
              email: 'test@example.com',
              password: 'hashedPassword',
              nickname: 'TestUser',
            },
          },
          questionLikes: [
            {
              createUserToken: 'like-token',
            },
          ],
          replies: [
            {
              replyId: 1,
              body: 'Test reply',
              createUserToken: 'reply-token',
              questionId: 1,
              sessionId: 'test-session',
              createdAt: new Date('2024-12-02T09:41:17.170Z'),
              deleted: false,
              replyLikes: [
                {
                  createUserToken: 'reply-like-token',
                },
              ],
              createUserTokenEntity: {
                user: {
                  userId: 1,
                  createdAt: new Date('2024-12-02T09:40:17.170Z'),
                  email: 'test@example.com',
                  password: 'hashedPassword',
                  nickname: 'ReplyUser',
                },
              },
            },
          ],
        },
      ];

      const date = new Date('2024-12-02T09:40:17.170Z');
      const mockSession = {
        sessionId: 'test-session',
        createdAt: new Date('2024-12-02T09:40:17.170Z'),
        title: 'Test Session',
        expiredAt: new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000),
        createUserId: 1,
      };

      const mockHostTokens = [
        {
          sessionId: 'test-session',
          token: 'host-token',
          userId: 1,
          isHost: true,
        },
      ];

      questionsRepository.findQuestionsWithDetails.mockResolvedValue(mockQuestions);
      sessionsRepository.findById.mockResolvedValue(mockSession);
      sessionsAuthRepository.findHostTokensInSession.mockResolvedValue(mockHostTokens);

      const [questions, isHost, expired, title] = await service.getQuestionsBySession(mockData);

      const question = questions[0];
      expect(question.questionId).toBe(1);
      expect(question.sessionId).toBe('test-session');
      expect(question.body).toBe('Test question');
      expect(question.closed).toBe(false);
      expect(question.pinned).toBe(false);
      expect(question.createdAt).toBeInstanceOf(Date);
      expect(question.isOwner).toBe(true);
      expect(question.likesCount).toBe(1);
      expect(question.liked).toBe(false);
      expect(question.nickname).toBe('TestUser');

      const reply = question.replies[0];
      expect(reply.replyId).toBe(1);
      expect(reply.body).toBe('Test reply');
      expect(reply.isOwner).toBe(false);
      expect(reply.likesCount).toBe(1);
      expect(reply.liked).toBe(false);
      expect(reply.nickname).toBe('ReplyUser');

      expect(isHost).toBeFalsy();
      expect(expired).toBeFalsy();
      expect(title).toBe('Test Session');
    });
  });

  describe('updateQuestionBody', () => {
    const mockQuestion = {
      questionId: 1,
      createUserToken: 'test-token',
      sessionId: 'test-session',
      body: 'Test question',
      createdAt: new Date(),
      closed: false,
      pinned: false,
    };

    it('should update question body when conditions are met', async () => {
      const updateDto = { body: 'Updated body', sessionId: 'test-session', token: 'test-token' };

      repliesRepository.findReplyByQuestionId.mockResolvedValue(null);
      questionsRepository.updateBody.mockResolvedValue({ ...mockQuestion, body: updateDto.body });

      await service.updateQuestionBody(1, updateDto, mockQuestion);

      expect(questionsRepository.updateBody).toHaveBeenCalledWith(1, updateDto.body);
    });

    it('should throw ForbiddenException when question has replies', async () => {
      const updateDto = { body: 'Updated body', sessionId: 'test-session', token: 'test-token' };

      repliesRepository.findReplyByQuestionId.mockResolvedValue(true);

      await expect(service.updateQuestionBody(1, updateDto, mockQuestion)).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException when question is closed', async () => {
      const updateDto = { body: 'Updated body', sessionId: 'test-session', token: 'test-token' };
      const closedQuestion = { ...mockQuestion, closed: true };

      await expect(service.updateQuestionBody(1, updateDto, closedQuestion)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('deleteQuestion', () => {
    const mockQuestion = {
      questionId: 1,
      createUserToken: 'test-token',
      closed: false,
      body: 'test-question',
      createdAt: new Date(),
      sessionId: 'test-session',
      pinned: false,
    };

    it('should delete question when user is host', async () => {
      sessionsAuthRepository.findByToken.mockResolvedValue({
        isHost: true,
        token: 'test-token',
        userId: 1,
        sessionId: 'test-session',
      });
      questionsRepository.deleteQuestion.mockResolvedValue(mockQuestion);

      await service.deleteQuestion(1, mockQuestion, { token: 'host-token', sessionId: 'test-session' });

      expect(questionsRepository.deleteQuestion).toHaveBeenCalledWith(1);
    });

    it('should throw ForbiddenException when non-owner tries to delete', async () => {
      sessionsAuthRepository.findByToken.mockResolvedValue({
        isHost: false,
        token: 'test-token',
        userId: 1,
        sessionId: 'test-session',
      });

      await expect(
        service.deleteQuestion(1, mockQuestion, { token: 'wrong-token', sessionId: 'test-session' }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('toggleLike', () => {
    it('should create like when it does not exist', async () => {
      questionsRepository.findLike.mockResolvedValue(null);

      const result = await service.toggleLike(1, 'test-token');

      expect(questionsRepository.createLike).toHaveBeenCalledWith(1, 'test-token');
      expect(result).toEqual({ liked: true });
    });

    it('should delete like when it exists', async () => {
      questionsRepository.findLike.mockResolvedValue({
        questionLikeId: 1,
        createUserToken: 'test-token',
        questionId: 1,
      });

      const result = await service.toggleLike(1, 'test-token');

      expect(questionsRepository.deleteLike).toHaveBeenCalledWith(1);
      expect(result).toEqual({ liked: false });
    });
  });

  describe('updateQuestionPinned', () => {
    it('should update pinned status when user is host', async () => {
      const updateDto = { token: 'host-token', sessionId: 'test-session', pinned: true };

      sessionsAuthRepository.findByToken.mockResolvedValue({
        isHost: true,
        token: 'test-token',
        userId: 1,
        sessionId: 'test-session',
      });
      questionsRepository.updatePinned.mockResolvedValue({
        questionId: 1,
        pinned: true,
        createUserToken: 'test-token',
        sessionId: 'test-session',
        body: 'test-body',
        closed: false,
        createdAt: new Date(),
      });

      await service.updateQuestionPinned(1, updateDto);

      expect(questionsRepository.updatePinned).toHaveBeenCalledWith(1, true);
    });

    it('should throw ForbiddenException when user is not host', async () => {
      const updateDto = { token: 'non-host-token', sessionId: 'test-session', pinned: true };

      sessionsAuthRepository.findByToken.mockResolvedValue({
        isHost: false,
        token: 'test-token',
        userId: 1,
        sessionId: 'test-session',
      });

      await expect(service.updateQuestionPinned(1, updateDto)).rejects.toThrow(ForbiddenException);
    });
  });
});
