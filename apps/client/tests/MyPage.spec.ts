import { expect, test } from '@playwright/test';

import { PostRefreshResponseDTO } from '@/features/auth/auth.dto';

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

  page.route('**/api/sessions', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        sessionData: [
          {
            sessionId: '1',
            title: '세션 1',
            createdAt: {
              year: 2024,
              month: 12,
              date: 1,
            },
            expired: false,
          },
          {
            sessionId: '2',
            title: '세션 2',
            createdAt: {
              year: 2024,
              month: 12,
              date: 2,
            },
            expired: true,
          },
          {
            sessionId: '3',
            title: '세션 3',
            createdAt: {
              year: 2024,
              month: 12,
              date: 3,
            },
            expired: false,
          },
        ],
      }),
    });
  });

  await page.goto('/my', { waitUntil: 'domcontentloaded' });
});

test('세션 목록 확인', async ({ page }) => {
  await expect(page.locator('text=참여한 세션 기록')).toBeVisible();

  const sessionTitles = ['세션 1', '세션 2', '세션 3'];
  await Promise.all(
    sessionTitles.map(async (title) => {
      await expect(page.locator(`text=${title}`)).toBeVisible();
    }),
  );
});
