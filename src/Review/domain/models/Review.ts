import UserId from "../../../Shared/domain/valueObject/UserId";
import ReviewAnswerBundle from "../valueObject/ReviewAnswerBundle";
import ReviewId from "../valueObject/ReviewId";
import { IReviewAnswer } from "./ReviewAnswer";

export default class Review {
    id: ReviewId;
    userId: UserId;
    reviews: ReviewAnswerBundle;
    createdAt: Date;
    updatedAt?: Date;

    constructor(id: ReviewId, userId: UserId, reviews: ReviewAnswerBundle) {
        this.id = id;
        this.userId = userId;
        this.reviews = reviews;
        this.createdAt = new Date();
    }

    public static create(id: ReviewId, userId: UserId, reviews: ReviewAnswerBundle): Review {
        return new Review(id, userId, reviews);
    }

    public static createWithoutId(userId: UserId, reviews: ReviewAnswerBundle): Review {
        return new Review(ReviewId.generate(), userId, reviews);
    }

    public static createFromPrimitives({ userId, reviews }: {id?: string; userId: string; reviews: Array<IReviewAnswer>}): Review {
        return new Review(
            userId ? ReviewId.create(userId) : ReviewId.generate(),
            UserId.create(userId),
            ReviewAnswerBundle.create(reviews)
        )
    }
    
}
