import { IUser } from '../../application/UserModel';
import User from '../../domain/models/User';
import IUserRepository from '../../domain/repository/UserRepository';
import UserEmail from '../../domain/valueObject/UserEmail';
import UserId from '../../../Shared/domain/valueObject/UserId';
import UserName from '../../domain/valueObject/UserName';
import { UserModel } from '../models/UserModel';
import toMongoModel from '../toMongoModel';

export default class UserRepository implements IUserRepository {
  constructor() {}

  async save(user: User): Promise<boolean> {
    const userMongo = toMongoModel(user);
    const userModel = UserModel.create(userMongo);
    const result = await (await userModel).save();
    return !!result;
  }

  async findById(id: UserId): Promise<IUser | null> {
    const userId = id.getValue();
    const userModel = await UserModel.findOne({ id: userId });
    if (!userModel) {
      return null;
    }
    return userModel;
  }

  async findByEmail(email: UserEmail): Promise<IUser | null> {
    const userEmail = email.getValue();
    const userModel = await UserModel.findOne({ email: userEmail });
    if (!userModel) {
      return null;
    }
    return userModel;
  }

  async findByName(name: UserName): Promise<IUser | null> {
    const userName = name.getValue();
    const userModel = await UserModel.findOne({ name: userName });
    if (!userModel) {
      return null;
    }
    return userModel;
  }

  async delete(id: UserId): Promise<boolean> {
    const userId = id.getValue();
    const result = await UserModel.deleteOne({ id: userId });
    return result.deletedCount === 1;
  }

  async update(user: User): Promise<boolean> {
    const userMongo = toMongoModel(user);
    const result = await UserModel.updateOne({ id: userMongo.id }, userMongo);
    return result.modifiedCount === 1;
  }

  async findAll(): Promise<IUser[]> {
    return await UserModel.find();
  }

  async exists(id: UserId): Promise<boolean> {
    const userId = id.getValue();
    const userModel = await UserModel.findById(userId);
    return !!userModel;
  }

  async existsByEmail(email: UserEmail): Promise<boolean> {
    const userEmail = email.getValue();
    const userModel = await UserModel.findOne({ email: userEmail });
    return !!userModel;
  }
}
