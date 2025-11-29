export interface ContainerConfig {
  name: string;
  image: string;
  volume: string;
  ports: string[];
  env: string;
}

export const CONTAINERS: Record<string, ContainerConfig> = {
  'recipio': {
    name: 'recipio',
    image: 'latest',
    volume: '~/logs:/app/logs',
    ports: ['3000'],
    env: 'recipio-env'
  },
  'movie-night': {
    name: 'movie-night',
    image: 'latest',
    volume: '~/logs:/app/logs',
    ports: ['3001'],
    env: 'movie-env'
  }
}

export const TRANSPORT = 'CONSOLE';