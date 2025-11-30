import DockerService from "../services/dockerService.js";
import type { Request, Response } from "express";
import logger from '../utils/loggers.js';
import { CONTAINERS, type ContainerConfig } from "../config/config.js";

export async function updateImageController(req: Request, res: Response) {
  const image = req.params.image;

  logger.info(`Received request to update docker image: ${image}`);

  if (!image) {
    logger.warn('No image parameter provided in request');
    return res.status(400).send({ error: 'Image parameter is required' });
  }

  try {
    const { stdout } = await DockerService.pullContainer(image);
    logger.info(`Successfully pulled image ${image}: ${stdout}`);
    res.status(200).send();
  } catch (err) {
    logger.error(`Failed to pull image ${image}`, err);
    res.status(500).send({ error: 'Failed to pull image' });
  }
}

export async function startContainerController(req: Request, res: Response) {
  const name = req.params.name;

  if (!name) {
    logger.warn('No name parameter provided in request');
    return res.status(400).send('No name parameter provided in request');
  }

  try {    
    const container: ContainerConfig | undefined = CONTAINERS[name];

    if(!container) {
      logger.warn(`${name} is currently not supported`);
      return res.status(501).send(`${name} is currently not supported`);
    }

    const { stdout } = await DockerService.startContainer(
      container.env,
      container.name,
      container.image,
      container.volume,
      container.ports
    );

    logger.info(`Successfully started the ${name} container: ${stdout}`);
    res.status(200).send();
  } catch (err) {
    logger.error(`Failed to start container ${name}`, err);
    res.status(500).send({ error: 'Failed to start container' });
  }

}

export async function stopContainerController(req: Request, res: Response) {
  const name = req.params.name

  if (!name) {
    logger.warn('No name parameter provided in request');
    return res.status(400).send('No name parameter provided in request');
  }

  try {
    const { stdout } = await DockerService.stopContainer(name);
    
    logger.info(`Successfully stopped the ${name} container: ${stdout}`);
    res.status(200).send();
  } catch (err) {
    logger.error(`Failed to stop container ${name}`, err);
    res.status(500).send({ error: 'Failed to stop container' });
  }
}

export async function getContainersController(req: Request, res: Response) {
  try {
    const containers: Record<string, string>[] = [];

    Object.keys(CONTAINERS).forEach(async (name) => {
      const status = await DockerService.checkContainerHealth(name);

      logger.info(`${name} container has status: ${status}`);

      const entry: Record<string, string> = {name, status};
      containers.push(entry);
    });

    res.status(200).send({containers});
  } catch (err) {
    logger.error(`Failed to check health: ${err}`)
    res.status(500).json({ error: "Failed to check health", details: err });
  }
}