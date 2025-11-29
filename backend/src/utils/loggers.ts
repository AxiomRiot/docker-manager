import winston from 'winston';
import { TRANSPORT } from '../config/config.js';
const { combine, timestamp, printf } = winston.format

const logger: winston.Logger = winston.createLogger({
  level: 'info',
  format: combine(
    winston.format.colorize(),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
  )
});

if( TRANSPORT === 'CONSOLE' ) {
  logger.add(new winston.transports.Console());
} else if ( TRANSPORT === 'FILE' ) {
  logger.add(new winston.transports.File({
    filename: 'logs/docker-manager.log',
    maxsize: 5242880,
    maxFiles: 5,
  }));
}

export default logger;