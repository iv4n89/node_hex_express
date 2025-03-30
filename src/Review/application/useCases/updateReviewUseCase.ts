import UseCaseBase from "../../../Shared/application/UseCaseBase";
import { IReviewAnswer } from "../../domain/models/ReviewAnswer";
import IReviewRepository from "../../domain/repository/ReviewRepository";
import ReviewAnswerBundle from "../../domain/valueObject/ReviewAnswerBundle";
import ReviewId from "../../domain/valueObject/ReviewId";

export default class UpdateReviewUseCase extends UseCaseBase<{id: string; review: Array<IReviewAnswer>}, boolean> {
    constructor(private readonly reviewRepository: IReviewRepository) {
        super();
    }

    override async execute(input: { id: string; review: Array<IReviewAnswer>; }): Promise<boolean> {
        const id = ReviewId.create(input.id);
        const reviewAnswers = ReviewAnswerBundle.create(input.review);
        const foundReview = await this.reviewRepository.findById(id);
        if (!foundReview) throw new Error("Review not found");
        foundReview.updateReviews(reviewAnswers);
        const updated = await this.reviewRepository.update(foundReview);
        if (!updated) throw new Error("Error updating review");
        return updated;
    }
}
