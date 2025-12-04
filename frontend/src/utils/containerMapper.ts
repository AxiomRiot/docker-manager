import type { ContainerType } from '../types/containerTypes';
import { STATUS } from '../types/containerTypes';

function mapStatus(status: string): STATUS {
  switch (status) {
    case 'running':
      return STATUS.RUNNING;
    case 'stopped':
      return STATUS.STOPPED;
    default:
      return STATUS.UNKNOWN;
  }
}

export function mapResponseToContainerType(data: any): ContainerType {
  return {
    name: data.container,
    status: mapStatus(data.status),
    imagePath: `${data.container}.png`,
    lastUpdated: Date.now(),
  };
}
