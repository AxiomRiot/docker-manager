import type { ContainerType } from '../types/containerTypes';

export function mapResponseToContainerType(data: any): ContainerType {
  return {
    name: data.container,
    status: data.status,
    imagePath: `${data.container}.png`,
    lastUpdated: Date.now(),
  };
}
