import api from '@/config/api';
import type IResponse from '@/interface/IResponse';
import type { ICreateUserCharacter, IUserCharacter } from '@/interface/IUserCharacter';

export default class UserCharacterService {
  private static baseUrl = '/user-character';

  static async getAll(): Promise<IUserCharacter[]> {
    const response = await api.get<IUserCharacter[]>(this.baseUrl);
    return response.data;
  }

  static async create(createUserCharacter: ICreateUserCharacter): Promise<IResponse> {
    const response = await api.post<IResponse>(this.baseUrl, createUserCharacter);
    return response.data;
  }

  static async delete(id: string): Promise<IResponse> {
    const response = await api.delete<IResponse>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  static async select(id: string): Promise<void> {
    await api.get<void>(`${this.baseUrl}/select/${id}`);
  }

  static async logout(): Promise<void> {
    await api.get<void>(`${this.baseUrl}/logout`);
  }
}
