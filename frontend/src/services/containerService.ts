import type { ContainerType } from '../types/containerTypes';
import { ContainerApi } from '../api/containerApi';
import { mapResponseToContainerType } from '../utils/containerMapper';

const api = new ContainerApi();

export async function getLoadedContainers(): Promise<ContainerType[]> {
  const data = await api.get('/containers');
  const results: object[] = data.containers;

  const containers: ContainerType[] = results.map((container) => {
    return mapResponseToContainerType(container);
  });

  return containers;
}
