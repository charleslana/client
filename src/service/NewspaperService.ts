import api from '@/config/api';
import type { INewspaper } from '@/interface/INewspaper';
import type IResultPaginated from '@/interface/IResultPaginated';

export default class NewspaperService {
  private static baseUrl = '/newspaper';

  static async getPaginated(page = 1): Promise<IResultPaginated<INewspaper>> {
    const response = await api.get<IResultPaginated<INewspaper>>(`${this.baseUrl}?page=${page}`);
    return response.data;
  }
}
