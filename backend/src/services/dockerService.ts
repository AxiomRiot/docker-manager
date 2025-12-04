import { exec } from "node:child_process";
import logger from '../utils/loggers.js';
import chalk from 'chalk';

export default class DockerService {
  private static runCommand(command: string): Promise<{ stdout: string; stderr: string }> {
    logger.info(command);
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject({ error, stderr });
        }
        resolve({ stdout, stderr });
      });
    });
  }

  public static async pullContainer(image: string) {
    logger.info(`Pulling latest image for [${image}] from docker registry`);
    return this.runCommand(`docker pull ${image}`);
  }

  public static async startContainer(
    env: string,
    name: string,
    image:string,
    volume: string,
    ports: string[]
  ) {
    logger.info(`Starting the ${chalk.blue(name)} container with the image: ${chalk.blue(image)}`);
    logger.info(
      `Container is using the ${chalk.cyanBright(env)} environment, the ${chalk.greenBright(volume)} volume, and the ports: ${chalk.magentaBright(ports)}`
    );
  
    return this.runCommand(`docker run --env-file ~/environs/${env} -d -p ${ports[0]}:${ports[0]} -v ${volume} --name ${name} axiomriot/${name}:${image}`);
  }

  public static async stopContainer(name: string) {
    logger.info(`Stopping the ${chalk.blue(name)} container`);
    return this.runCommand(`docker stop ${name} && docker rm ${name}`);
  }

  public static async checkContainerHealth(name: string): Promise<string> {
    logger.info(`Checking health for ${name} container`);

    return new Promise((resolve, reject) => {
      exec(
        `docker inspect --format='{{.State.Status}}' ${name}`,
        (error, stdout, stderr) => {
          if (error) {
            return reject('stopped');
          }
          resolve(stdout.trim());
        }
      );
    });
  }
}
