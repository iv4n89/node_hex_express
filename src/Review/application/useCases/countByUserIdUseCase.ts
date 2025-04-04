import UseCaseBase from "../../../Shared/application/UseCaseBase";
import UserId from "../../../Shared/domain/valueObject/UserId";
import IReviewRepository from "../../domain/repository/ReviewRepository";

export default class CountByUserIdUseCase extends UseCaseBase<UserId, number> {
    constructor(private readonly reviewRepository: IReviewRepository) {
        super();
    }

    override async execute(input: UserId): Promise<number> {
        const count = await this.reviewRepository.countByUserId(input);
        return count;
    }
}
