import UseCaseBase from "../../../Shared/application/UseCaseBase";
import UserId from "../../../Shared/domain/valueObject/UserId";
import Review from "../../domain/models/Review";
import IReviewRepository from "../../domain/repository/ReviewRepository";

export default class FindReviewsByUserIdUseCase extends UseCaseBase<string, Array<Review>> {
    constructor(private readonly reviewRepository: IReviewRepository) {
        super();
    }

    override async execute(input: string): Promise<Review[]> {
        const userId = UserId.create(input);
        const foundReviews = await this.reviewRepository.findByUserId(userId);
        if (!foundReviews || !foundReviews.length) throw new Error("No reviews found for this user");
        return foundReviews;
    }
}
