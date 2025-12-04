export enum STATUS {
  RUNNING = 'running',
  STOPPING = 'stopping',
  STOPPED = 'stopped',
  UPDATING = 'updating',
  UNKNOWN = 'unknown',
}

export interface ContainerType {
  name: string;
  status: STATUS;
  imagePath: string;
  lastUpdated: number;
};
