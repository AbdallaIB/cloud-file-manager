module.exports = {
  apps: [
    {
      name: 'app',
      script: 'ts-node -r tsconfig-paths/register app.ts',
      watch: ['app.ts'],
      cwd: '/home/cloud-file-manager/server/',
      ignore_watch: ['uploads', 'node_modules'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
