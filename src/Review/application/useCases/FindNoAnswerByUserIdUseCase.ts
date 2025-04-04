import UseCaseBase from "../../../Shared/application/UseCaseBase";
import UserId from "../../../Shared/domain/valueObject/UserId";
import Review from "../../domain/models/Review";
import IReviewRepository from "../../domain/repository/ReviewRepository";

export default class FindNoAnswerByUserIdUseCase extends UseCaseBase<string, Array<Review>> {
    constructor(private readonly reviewRepository: IReviewRepository) {
        super();
    }

    override async execute(input: string): Promise<Review[]> {
        const userId = UserId.create(input);
        const reviews = await this.reviewRepository.findNoAnswerByUserId(userId);
        if (!reviews) {
            return [];
        }
        return reviews;
    }
}
