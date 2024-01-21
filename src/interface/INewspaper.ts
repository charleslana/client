import type { IUser } from './IUser';

export interface INewspaper {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  user: IUser;
}
