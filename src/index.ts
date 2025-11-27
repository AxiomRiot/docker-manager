import app from './app';
import logger from './utils/loggers';

const port = process.env.PORT;

logger.info("Starting Application");

app.listen(port, () => {
  logger.info(`Server is up on port ${port}`);
});