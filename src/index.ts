import app from './app';
import logger from './utils/loggers';
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

export { default as DockerService } from './services/dockerService';
export { default as app } from './app';
export * from './controllers/dockerController'; // only if you want controllers exposed