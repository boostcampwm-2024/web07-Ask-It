import { expect, test } from '@playwright/test';

import { PostRefreshResponseDTO } from '@/features/auth/auth.dto';
import { GetQuestionsResponseDTO } from '@/features/session/qna';

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
              replies: [
                {
                  replyId: 1,
                  body: '리플 내용',
                  createdAt: new Date().toISOString(),
                  isOwner: true,
                  likesCount: 0,
                  liked: false,
                  nickname: '리플 작성자',
                  deleted: false,
                  isHost: false,
                  userId: 1,
                },
              ],
            },
          ],
          isHost: true,
          expired: false,
          sessionTitle: '테스트 세션 제목',
        } as GetQuestionsResponseDTO),
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

  page.route('**/api/replies/1/likes', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        liked: true,
        likesCount: 1,
      }),
    });
  });

  page.route('**/api/replies/1**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  page.route('**/api/replies', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        reply: {
          userId: 1,
          replyId: 2,
          body: '새로운 리플 내용',
          createdAt: new Date().toISOString(),
          isOwner: true,
          likesCount: 0,
          liked: false,
          delete: false,
          nickname: '답글 작성자',
          isHost: false,
        },
      }),
    });
  });

  page.route('**/api/replies/1/body', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        reply: {
          replyId: 1,
          body: '수정된 리플 내용',
          createUserToken: 'fake-user-token',
          sessionId: 'fake-session-id',
          questionId: 1,
          createdAt: new Date().toISOString(),
        },
      }),
    });
  });

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.evaluate(() => {
    localStorage.setItem(
      'sessionTokens',
      JSON.stringify({ 'fake-session-id': 'session-token' }),
    );
  });

  await page.goto('/session/fake-session-id/1', {
    waitUntil: 'domcontentloaded',
  });
});

test('질문과 답변이 올바르게 표시되는지 확인', async ({ page }) => {
  await expect(page.getByText('질문 내용')).toBeVisible();
  await expect(page.getByText('리플 내용')).toBeVisible();
  await expect(page.getByText('리플 작성자')).toBeVisible();
});

test('답변 좋아요', async ({ page }) => {
  await expect(page.getByText('질문 내용')).toBeVisible();
  await expect(page.getByText('리플 내용')).toBeVisible();
  await expect(page.getByText('리플 작성자')).toBeVisible();

  const responsePromise = page.waitForResponse(async (response) =>
    response.url().includes('/api/replies/1/likes'),
  );

  const likeButton = page.getByRole('button', { name: '0' });
  await likeButton.waitFor();
  await likeButton.click();

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  await expect(page.getByRole('button', { name: '1' })).toBeVisible();
});

test('답변 삭제', async ({ page }) => {
  await expect(page.getByText('질문 내용')).toBeVisible();
  await expect(page.getByText('리플 내용')).toBeVisible();
  await expect(page.getByText('리플 작성자')).toBeVisible();

  const responsePromise = page.waitForResponse(
    async (response) =>
      response.url().includes('/api/replies/1') &&
      response.request().method() === 'DELETE',
  );

  const deleteButton = page.getByRole('main').getByRole('button').nth(4);
  await deleteButton.waitFor();
  await deleteButton.click();

  const confirmButton = page.getByRole('button', { name: '삭제하기' });
  await confirmButton.waitFor();
  await confirmButton.click();

  const response = await responsePromise;
  expect(response.status()).toBe(200);
  await expect(page.getByText('리플 내용')).toBeHidden();
});

test('답글 생성', async ({ page }) => {
  await expect(page.getByText('질문 내용')).toBeVisible();
  await expect(page.getByText('리플 내용')).toBeVisible();
  await expect(page.getByText('리플 작성자')).toBeVisible();

  const replyCreate = page.getByRole('button', { name: '답변하기' });
  await replyCreate.waitFor();
  await replyCreate.click();

  const textarea = page.locator('textarea');
  await textarea.waitFor();
  await textarea.fill('새로운 리플 내용');

  const responsePromise = page.waitForResponse(async (response) =>
    response.url().includes('/api/replies'),
  );

  const submitButton = page.getByRole('button', { name: '생성하기' });
  await submitButton.waitFor();
  await submitButton.click();

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  await expect(page.getByText('새로운 리플 내용')).toBeVisible();
});

test('답글 수정', async ({ page }) => {
  const editButton = page
    .locator('div:nth-child(2) > .inline-flex > button')
    .first();
  await editButton.waitFor();
  await editButton.click();

  const textarea = page.locator('textarea');
  await textarea.waitFor();
  await textarea.fill('수정된 리플 내용');

  const responsePromise = page.waitForResponse(async (response) =>
    response.url().includes('/api/replies/1/body'),
  );
  const submitButton = page.getByRole('button', { name: '수정하기' });
  await submitButton.waitFor();
  await submitButton.click();

  const response = await responsePromise;
  expect(response.status()).toBe(200);
  await expect(page.getByText('수정된 리플 내용')).toBeVisible();
});
