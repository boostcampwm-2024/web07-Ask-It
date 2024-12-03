import { expect, test } from '@playwright/test';

import { PostRefreshResponseDTO } from '@/features/auth/auth.dto';
import {
  GetQuestionsResponseDTO,
  PatchQuestionBodyResponseDTO,
  PatchQuestionPinnedResponseDTO,
  PostQuestionLikeResponseDTO,
  PostQuestionResponseDTO,
} from '@/features/session/qna';

test.beforeEach(async ({ page }) => {
  page.route('**/api/auth/token', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        accessToken: 'new-access-token',
        userId: 1,
      } as PostRefreshResponseDTO),
    });
  });

  page.route('**/api/sessions-auth?**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'session-token' }),
    });
  });

  page.route('**/api/questions**', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          questions: [
            {
              questionId: 1,
              sessionId: 'fake-session-id',
              body: '**질문 내용**',
              closed: false,
              pinned: false,
              liked: false,
              likesCount: 0,
              createdAt: new Date().toISOString(),
              isOwner: true,
              nickname: '질문자',
              replies: [],
            },
          ],
          isHost: true,
          expired: false,
          sessionTitle: '테스트 세션 제목',
        } as GetQuestionsResponseDTO),
      });
    } else if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          question: {
            questionId: 2,
            sessionId: 'fake-session-id',
            body: '완전 새로운 질문',
            closed: false,
            pinned: false,
            liked: false,
            likesCount: 0,
            createdAt: new Date().toISOString(),
            isOwner: true,
            nickname: '질문자',
            replies: [],
          },
        } as PostQuestionResponseDTO),
      });
    }
  });

  page.route('**/api/chats**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ chats: [] }),
    });
  });

  page.route('**/api/questions/1/likes', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        likesCount: 1,
        liked: true,
      } as PostQuestionLikeResponseDTO),
    });
  });

  page.route('**/api/questions/1/pinned', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        question: {
          questionId: 1,
          sessionId: 'fake-session-id',
          body: '**질문 내용**',
          closed: false,
          pinned: true,
          createdAt: new Date().toISOString(),
          createUserToken: 'session-token',
        },
      } as PatchQuestionPinnedResponseDTO),
    });
  });

  page.route('**/api/questions/1/closed', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        question: {
          questionId: 1,
          sessionId: 'fake-session-id',
          body: '**질문 내용**',
          closed: true,
          pinned: false,
          createdAt: new Date().toISOString(),
          createUserToken: 'session-token',
        },
      }),
    });
  });

  page.route('**/api/questions/1/body', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        question: {
          questionId: 1,
          sessionId: 'fake-session-id',
          body: '수정된 질문 내용',
          closed: false,
          pinned: false,
          createdAt: new Date().toISOString(),
          createUserToken: 'session-token',
        },
      } as PatchQuestionBodyResponseDTO),
    });
  });

  page.route('**/api/questions/1**', async (route) => {
    if (route.request().method() === 'DELETE') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    }
  });

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.evaluate(() => {
    localStorage.setItem('sessionTokens', JSON.stringify({ 'fake-session-id': 'session-token' }));
  });

  await page.goto('/session/fake-session-id', {
    waitUntil: 'domcontentloaded',
  });
});

test('질문 목록이 올바르게 표시되는지 확인', async ({ page }) => {
  await expect(page.locator('text=테스트 세션 제목')).toBeVisible();
});

test('질문 좋아요', async ({ page }) => {
  const responsePromise = page.waitForResponse(async (response) => response.url().includes('/api/questions/1/likes'));
  const likeButton = page.getByRole('button', { name: '0' }).first();
  await likeButton.click();
  expect((await responsePromise).status()).toBe(200);
  await expect(page.getByRole('button', { name: '1' })).toBeVisible();
});

test('질문 고정', async ({ page }) => {
  const responsePromise = page.waitForResponse(async (response) => response.url().includes('/api/questions/1/pinned'));
  const pinButton = page.getByRole('button', { name: '고정' });
  await pinButton.click();
  expect((await responsePromise).status()).toBe(200);
  await expect(page.getByRole('button', { name: '고정 해제' })).toBeVisible();
});

test('질문 닫기', async ({ page }) => {
  const responsePromise = page.waitForResponse(async (response) => response.url().includes('/api/questions/1/closed'));
  const closeButton = page.locator(
    'button.flex.items-center.justify-center.rounded-md.px-3.py-2.self-start.transition-colors.duration-200.bg-red-100.hover\\:bg-red-200',
  );
  await closeButton.click();
  expect((await responsePromise).status()).toBe(200);
});

test('질문 생성 버튼을 클릭하면 모달이 열린다', async ({ page }) => {
  const openModalButton = page.getByRole('button', { name: '질문하기' });
  await openModalButton.click();
  await expect(page.locator('text=생성하기')).toBeVisible();
});

test('질문 생성을 하면 새로운 질문이 리스트에 생긴다.', async ({ page }) => {
  const openModalButton = page.getByRole('button', { name: '질문하기' });
  await openModalButton.click();
  await page.fill('textarea', '완전 새로운 질문');

  const responsePromise = page.waitForResponse(async (response) => response.url().includes('/api/questions'));
  const createButton = page.getByRole('button', { name: '생성하기' });
  await createButton.click();
  const response = await responsePromise;
  expect(response.status()).toBe(200);

  await expect(page.getByRole('button', { name: '생성하기' })).toBeHidden();
  await expect(page.locator('text=완전 새로운 질문')).toBeVisible();
});

test('질문 삭제를 하면 리스트에서 사라진다.', async ({ page }) => {
  const deleteButton = page.locator('div:nth-child(2) > div:nth-child(2) > button:nth-child(2)');
  await deleteButton.click();

  const responsePromise = page.waitForResponse(async (response) => response.url().includes('/api/questions/1'));

  const confirmButton = page.getByRole('button', { name: '삭제하기' });
  await confirmButton.click();

  const response = await responsePromise;
  expect(response.status()).toBe(200);
  await expect(page.locator('text=질문 내용')).toBeHidden();
});

test('질문을 수정하면 리스트에 반영된다.', async ({ page }) => {
  const editButton = page.locator('div:nth-child(2) > div:nth-child(2) > button:nth-child(1)');
  await editButton.click();

  await page.fill('textarea', '수정된 질문 내용');

  const responsePromise = page.waitForResponse(async (response) => response.url().includes('/api/questions/1/body'));
  const confirmButton = page.getByRole('button', { name: '수정하기' });
  await confirmButton.click();

  const response = await responsePromise;
  expect(response.status()).toBe(200);
  await expect(page.locator('text=수정된 질문 내용')).toBeVisible();
});
