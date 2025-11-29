import type { ContainerType } from '../types/containerTypes';

export function mapResponseToContainerType(data: any): ContainerType {
  return {
    name: data.name,
    status: data.status,
    imagePath: `${data.name}.png`,
    lastUpdated: Date.now(),
  };
}
