export enum STATUS {
  STARTING = 'starting',
  RUNNING = 'running',
  STOPPING = 'stopping',
  STOPPED = 'stopped',
  UPDATING = 'updating',
  UPDATED = 'updated',
  UNKNOWN = 'unknown',
}

export interface ContainerType {
  name: string;
  status: STATUS;
  imagePath: string;
  lastUpdated: number;
};
