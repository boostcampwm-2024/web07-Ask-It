import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

test('헤더와 설명 텍스트가 올바르게 표시되는지 확인', async ({ page }) => {
  await expect(page.getByText('질문과 답변을 넘어,')).toBeVisible();
  await expect(page.getByText('함께 만드는 인사이트')).toBeVisible();
  await expect(
    page.getByText('실시간 Q&A와 소통을 위한 최적의 플랫폼'),
  ).toBeVisible();
});

test('기능 카드들이 모두 표시되는지 확인', async ({ page }) => {
  const features = [
    { title: '실시간 Q&A', desc: '연사자와 익명의 청중의 실시간 응답' },
    { title: '채팅', desc: '실시간 채팅으로 즉각적인 소통' },
    {
      title: '권한 관리',
      desc: '연사자와 참가자를 위한 세분화된 권한 시스템',
    },
    { title: '아카이빙', desc: '세션 내용 보존과 효율적인 자료화' },
  ];

  await Promise.all(
    features.map(async (feature) => {
      await expect(
        page.locator(`text=${feature.title} >> .. >> text=${feature.desc}`),
      ).toBeVisible();
    }),
  );
});

test('회원가입 플로우 전체 테스트', async ({ page }) => {
  await page.click('text=회원가입');

  const signUpButton = page.locator('text=회원 가입');
  await expect(signUpButton).toBeDisabled();

  await page.route('**/api/users/emails/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ exists: false }),
    });
  });

  await page.route('**/api/users/nicknames/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ exists: false }),
    });
  });

  await page.route('**/api/users', async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
    });
  });

  await page.fill('input[placeholder="example@gmail.com"]', 'test@example.com');
  await page.waitForResponse('**/api/users/emails/**');

  await page.fill('input[placeholder="닉네임을 입력해주세요"]', 'testUser');
  await page.waitForResponse('**/api/users/nicknames/**');

  await page.fill(
    'input[placeholder="비밀번호를 입력해주세요"]',
    'Password123!',
  );

  await expect(signUpButton).toBeEnabled();

  const response = page.waitForResponse('**/api/users');
  await signUpButton.click();
  expect((await response).status()).toBe(201);

  await expect(page.locator('text=회원가입 되었습니다.')).toBeVisible();
});

test('회원 가입이 이미 중복된 이메일이 있어서 실패하는 경우', async ({
  page,
}) => {
  await page.click('text=회원가입');

  const signUpButton = page.locator('text=회원 가입');
  await expect(signUpButton).toBeDisabled();

  await page.route('**/api/users/emails/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ exists: true }),
    });
  });

  await page.fill(
    'input[placeholder="example@gmail.com"]',
    'duplicate@example.com',
  );
  await page.waitForResponse('**/api/users/emails/**');

  await expect(page.locator('text=이미 사용 중인 이메일입니다.')).toBeVisible();
  await expect(signUpButton).toBeDisabled();
});

test('회원 가입이 이미 중복된 닉네임이 있어서 실패하는 경우', async ({
  page,
}) => {
  await page.click('text=회원가입');

  const signUpButton = page.locator('text=회원 가입');
  await expect(signUpButton).toBeDisabled();

  await page.route('**/api/users/emails/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ exists: false }),
    });
  });

  await page.route('**/api/users/nicknames/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ exists: true }),
    });
  });

  await page.fill(
    'input[placeholder="example@gmail.com"]',
    'duplicate@example.com',
  );
  await page.waitForResponse('**/api/users/emails/**');
  await expect(page.locator('text=사용 가능한 이메일입니다.')).toBeVisible();

  await page.fill('input[placeholder="닉네임을 입력해주세요"]', 'testUser');
  await page.waitForResponse('**/api/users/nicknames/**');
  await expect(page.locator('text=이미 사용 중인 닉네임입니다.')).toBeVisible();

  await expect(signUpButton).toBeDisabled();
});

test('로그인 / 로그아웃 플로우 전체 테스트', async ({ page }) => {
  await page.click('text=로그인');

  const loginButton = page.locator('text=로그인').nth(1);

  await page.fill('input[placeholder="example@gmail.com"]', 'test@example.com');
  await page.fill(
    'input[placeholder="비밀번호를 입력해주세요"]',
    'Password123!',
  );

  await expect(loginButton).toBeEnabled();

  await page.route('**/api/auth/login', async (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ accessToken: 'fake-jwt-token' }),
    });
  });

  const response = page.waitForResponse('**/api/auth/login');
  await loginButton.click();
  expect((await response).status()).toBe(200);

  await expect(page.locator('text=로그인 되었습니다.')).toBeVisible();

  await page.click('text=로그아웃');
  await expect(page.locator('text=로그아웃 되었습니다.')).toBeVisible();
});
