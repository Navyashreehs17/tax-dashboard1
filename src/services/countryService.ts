import { Country } from '../types/Country';

const BASE_URL = 'https://685013d7e7c42cfd17974a33.mockapi.io/countries';

export const countryService = {
  async getAll(): Promise<Country[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return response.json();
  },
};
