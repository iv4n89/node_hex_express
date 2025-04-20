import UseCaseBase from '../../../Shared/application/UseCaseBase';
import { IRequestRepository } from '../../domain/repository/RequestRepository';
import RequestId from '../../domain/valueObject/RequestId';

export default class DeleteUseCase extends UseCaseBase<string, boolean> {
  constructor(private readonly requestRepository: IRequestRepository) {
    super();
  }

  override async execute(input: string): Promise<boolean> {
    const requestId = RequestId.create(input);
    const request = await this.requestRepository.findById(requestId);
    if (!request) {
      throw new Error('Request not found');
    }
    const deleted = await this.requestRepository.delete(requestId);
    if (!deleted) {
      throw new Error('Request not deleted');
    }
    return deleted;
  }
}
