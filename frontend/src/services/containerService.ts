import type { ContainerType } from '../types/containerTypes';
import { ContainerApi } from '../api/containerApi';
import { mapResponseToContainerType } from '../utils/containerMapper';

const api = new ContainerApi();

export async function getLoadedContainers(): Promise<ContainerType[]> {
  const containers: ContainerType[] = [];

  const data = await api.get('/containers/');

  console.warn(data);

  return containers;
}
