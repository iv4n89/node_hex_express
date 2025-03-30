import { IUser } from '../UserModel';

export default interface IUserService {
  save(name: string, email: string): Promise<boolean>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findByName(name: string): Promise<IUser | null>;
  delete(id: string): Promise<boolean>;
  update(id: string, name: string, email: string): Promise<boolean>;
  findAll(): Promise<IUser[]>;
  exists(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
}
