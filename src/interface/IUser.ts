import type UserGenderEnum from '@/enum/UserGenderEnum';

export interface ICreateUser {
  username: string;
  password: string;
  email: string;
  fullName: string;
  gender: UserGenderEnum;
}

export interface ICheckUsername {
  username: string;
}

export interface ICheckEmail {
  email: string;
}

export interface IUserVip {
  vip: null | string;
}

export interface IUser {
  credit: number;
  vip: string | null;
  fullName: string;
}
