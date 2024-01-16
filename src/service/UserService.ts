import api from '@/config/api';
import type IExists from '@/interface/IExists';
import type ILogin from '@/interface/ILogin';
import type IResponse from '@/interface/IResponse';
import type IToken from '@/interface/IToken';
import type { ICreateUser, IUserVip } from '@/interface/IUser';

export default class UserService {
  private static baseUrl = '/user';

  static async register(createUser: ICreateUser): Promise<IResponse> {
    const response = await api.post<IResponse>(this.baseUrl, createUser);
    return response.data;
  }

  static async validateUsername(username: string): Promise<IExists> {
    const response = await api.get<IExists>(`${this.baseUrl}/check-username/${username}`);
    return response.data;
  }

  static async validateEmail(email: string): Promise<IExists> {
    const response = await api.get<IExists>(`${this.baseUrl}/check-email/${email}`);
    return response.data;
  }

  static async login(login: ILogin): Promise<IToken> {
    const response = await api.post<IToken>(`${this.baseUrl}/auth`, login);
    return response.data;
  }

  static async getVIP(): Promise<IUserVip> {
    const response = await api.get<IUserVip>(`${this.baseUrl}/vip`);
    return response.data;
  }
}
