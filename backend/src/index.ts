import app from './app.js';
import logger from './utils/loggers.js';
import type { Server } from 'http';

export function createServer(): typeof app {
  return app;
}

export function startServer(port?: number): Server {
  const p = Number(port ?? process.env.PORT ?? 3000);
  const server = app.listen(p, () => {
    logger.info(`Server is up on port ${p}`);
  });
  return server;
}

export { default as DockerService } from './services/dockerService.js';
export { default as app } from './app.js';
export * from './controllers/dockerController.js'; // only if you want controllers exposed