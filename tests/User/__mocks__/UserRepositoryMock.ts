import UserId from '../../../src/Shared/domain/valueObject/UserId';
import User from '../../../src/User/domain/models/User';
import IUserRepository from '../../../src/User/domain/repository/UserRepository';
import UserEmail from '../../../src/User/domain/valueObject/UserEmail';
import UserName from '../../../src/User/domain/valueObject/UserName';

export class UserRepositoryMock implements IUserRepository {
  // Spies para cada método
  readonly saveSpy = jest.fn();
  readonly findByIdSpy = jest.fn();
  readonly findByEmailSpy = jest.fn();
  readonly findByNameSpy = jest.fn();
  readonly deleteSpy = jest.fn();
  readonly updateSpy = jest.fn();
  readonly findAllSpy = jest.fn();
  readonly existsSpy = jest.fn();
  readonly existsByEmailSpy = jest.fn();

  // Estado interno para simular la base de datos
  private users: Map<string, User> = new Map();
  
  // Configuración para simular errores o comportamientos específicos
  private _shouldFailSave = false;
  private _shouldFailFindById = false;
  private _shouldFailFindByEmail = false;
  private _shouldFailFindByName = false;
  private _shouldFailDelete = false;
  private _shouldFailUpdate = false;
  private _shouldFailFindAll = false;
  private _shouldFailExists = false;
  private _shouldFailExistsByEmail = false;

  // Métodos para configurar comportamientos
  setShouldFailSave(value: boolean): UserRepositoryMock {
    this._shouldFailSave = value;
    return this;
  }
  
  setShouldFailFindById(value: boolean): UserRepositoryMock {
    this._shouldFailFindById = value;
    return this;
  }
  
  setShouldFailFindByEmail(value: boolean): UserRepositoryMock {
    this._shouldFailFindByEmail = value;
    return this;
  }
  
  setShouldFailFindByName(value: boolean): UserRepositoryMock {
    this._shouldFailFindByName = value;
    return this;
  }
  
  setShouldFailDelete(value: boolean): UserRepositoryMock {
    this._shouldFailDelete = value;
    return this;
  }
  
  setShouldFailUpdate(value: boolean): UserRepositoryMock {
    this._shouldFailUpdate = value;
    return this;
  }
  
  setShouldFailFindAll(value: boolean): UserRepositoryMock {
    this._shouldFailFindAll = value;
    return this;
  }
  
  setShouldFailExists(value: boolean): UserRepositoryMock {
    this._shouldFailExists = value;
    return this;
  }
  
  setShouldFailExistsByEmail(value: boolean): UserRepositoryMock {
    this._shouldFailExistsByEmail = value;
    return this;
  }

  // Métodos para poblar el mock con datos
  addUser(user: User): UserRepositoryMock {
    this.users.set(user.id.getValue(), user);
    return this;
  }

  addUsers(users: User[]): UserRepositoryMock {
    users.forEach(user => this.users.set(user.id.getValue(), user));
    return this;
  }

  clearUsers(): UserRepositoryMock {
    this.users.clear();
    return this;
  }

  // Métodos de implementación del IUserRepository
  async save(user: User): Promise<boolean> {
    this.saveSpy(user);
    
    if (this._shouldFailSave) {
      return false;
    }
    
    this.users.set(user.id.getValue(), user);
    return true;
  }

  async findById(id: UserId): Promise<User | null> {
    this.findByIdSpy(id);
    
    if (this._shouldFailFindById) {
      return null;
    }
    
    return this.users.get(id.getValue()) || null;
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    this.findByEmailSpy(email);
    
    if (this._shouldFailFindByEmail) {
      return null;
    }
    
    const emailValue = email.getValue();
    return Array.from(this.users.values()).find(user => 
      user.email.getValue() === emailValue
    ) || null;
  }

  async findByName(name: UserName): Promise<User | null> {
    this.findByNameSpy(name);
    
    if (this._shouldFailFindByName) {
      return null;
    }
    
    const nameValue = name.getValue();
    return Array.from(this.users.values()).find(user => 
      user.name.getValue() === nameValue
    ) || null;
  }

  async delete(id: UserId): Promise<boolean> {
    this.deleteSpy(id);
    
    if (this._shouldFailDelete) {
      return false;
    }
    
    return this.users.delete(id.getValue());
  }

  async update(user: User): Promise<boolean> {
    this.updateSpy(user);
    
    if (this._shouldFailUpdate) {
      return false;
    }
    
    if (!this.users.has(user.id.getValue())) {
      return false;
    }
    
    this.users.set(user.id.getValue(), user);
    return true;
  }

  async findAll(): Promise<User[]> {
    this.findAllSpy();
    
    if (this._shouldFailFindAll) {
      return [];
    }
    
    return Array.from(this.users.values());
  }

  async findLastSaved(): Promise<User | null> {
    this.findAllSpy();
    
    if (this._shouldFailFindAll) {
      return null;
    }
    
    const usersArray = Array.from(this.users.values());
    return usersArray[usersArray.length - 1] || null;
  }

  async exists(id: UserId): Promise<boolean> {
    this.existsSpy(id);
    
    if (this._shouldFailExists) {
      return false;
    }
    
    return this.users.has(id.getValue());
  }

  async existsByEmail(email: UserEmail): Promise<boolean> {
    this.existsByEmailSpy(email);
    
    if (this._shouldFailExistsByEmail) {
      return false;
    }
    
    const emailValue = email.getValue();
    return Array.from(this.users.values()).some(user => 
      user.email.getValue() === emailValue
    );
  }

  // Métodos de reset para pruebas
  reset(): void {
    this.clearUsers();
    this.saveSpy.mockClear();
    this.findByIdSpy.mockClear();
    this.findByEmailSpy.mockClear();
    this.findByNameSpy.mockClear();
    this.deleteSpy.mockClear();
    this.updateSpy.mockClear();
    this.findAllSpy.mockClear();
    this.existsSpy.mockClear();
    this.existsByEmailSpy.mockClear();
    
    this._shouldFailSave = false;
    this._shouldFailFindById = false;
    this._shouldFailFindByEmail = false;
    this._shouldFailFindByName = false;
    this._shouldFailDelete = false;
    this._shouldFailUpdate = false;
    this._shouldFailFindAll = false;
    this._shouldFailExists = false;
    this._shouldFailExistsByEmail = false;
  }
}