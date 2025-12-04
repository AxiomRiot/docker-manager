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

export async function stopContainer(container: string) {
  return api.post<{ name: string; status?: string }>(
    '/stop',
    { name: container },
  );
}

export async function startContainer(container: string) {
  console.warn(container);
  return api.post<{ name: string }>(
    '/start',
    { name: container },
  );
}
