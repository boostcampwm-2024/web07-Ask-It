module.exports = {
  apps: [
    {
      name: 'http-server',
      script: 'pnpm',
      args: 'run start:prod',
      interpreter: 'none',
      cwd: './',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
    {
      name: 'ws-server',
      script: 'pnpm',
      args: 'run start:prod',
      interpreter: 'none',
      cwd: './',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
  ],
};
