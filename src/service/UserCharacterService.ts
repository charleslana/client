import api from '@/config/api';
import type UserCharacterClassEnum from '@/enum/UserCharacterClassEnum';
import type UserCharacterFactionEnum from '@/enum/UserCharacterFactionEnum';
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

  static async getMe(): Promise<IUserCharacter> {
    const response = await api.get<IUserCharacter>(`${this.baseUrl}/me`);
    return response.data;
  }

  static async getTopFaction(faction: UserCharacterFactionEnum): Promise<IUserCharacter[]> {
    const response = await api.get<IUserCharacter[]>(
      `${this.baseUrl}/top/faction?faction=${faction}`
    );
    return response.data;
  }

  static async getTopClass(_class: UserCharacterClassEnum): Promise<IUserCharacter[]> {
    const response = await api.get<IUserCharacter[]>(`${this.baseUrl}/top/class?class=${_class}`);
    return response.data;
  }

  static async updateAvatar(avatar: number): Promise<IResponse> {
    const response = await api.put<IResponse>(`${this.baseUrl}/avatar/${avatar}`);
    return response.data;
  }
}
