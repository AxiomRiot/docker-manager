const BASE_URL = 'http://192.168.0.39:3000';

export class ContainerApi {
  private async sendRequest<T = any>(path: string, method = 'GET', payload?: object): Promise<T> {
    const url = new URL(
      path,
      BASE_URL,
    );

    const options: RequestInit = {
      method,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    if (method !== 'GET' && payload !== undefined) {
      options.body = JSON.stringify(payload);
    }

    const response: Response = await fetch(url.toString(), options);

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} ${response.statusText} - ${text}`);
    }

    console.warn(response);
    return response.status === 200 ? (await response.json()) : (null as unknown as T);
  }

  public get<T = any>(path: string) {
    return this.sendRequest<T>(path, 'GET');
  }

  public post<T = any>(path: string, payload?: object) {
    return this.sendRequest<T>(path, 'POST', payload);
  }
}
