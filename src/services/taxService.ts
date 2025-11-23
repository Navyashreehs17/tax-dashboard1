import { Tax } from '../types/Tax';

const BASE_URL = 'https://685013d7e7c42cfd17974a33.mockapi.io/taxes';

export const taxService = {
  async getAll(): Promise<Tax[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch taxes');
    }
    return response.json();
  },

  async getById(id: string): Promise<Tax> {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tax with id ${id}`);
    }
    return response.json();
  },

  async update(id: string, data: Partial<Tax>): Promise<Tax> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update tax with id ${id}`);
    }
    return response.json();
  },
};
