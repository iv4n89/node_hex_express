import QuestionId from "../../../Question/domain/valueObject/QuestionId";
import UseCaseBase from "../../../Shared/application/UseCaseBase";
import UserId from "../../../Shared/domain/valueObject/UserId";
import IUserRepository from "../../../User/domain/repository/UserRepository";
import Review from "../../domain/models/Review";
import IReviewRepository from "../../domain/repository/ReviewRepository";

interface Input {
    questionsId: string;
    userId: string;
}

export default class FindByQuestionsIdAndUserIdUseCase extends UseCaseBase<Input, Review[]> {
    constructor(private readonly reviewRepository: IReviewRepository, private readonly userRepository: IUserRepository) { super(); }
    
    override async execute(input: Input): Promise<Review[]> {   
        try {
            const questionId = QuestionId.create(input.questionsId);
            const userId = UserId.create(input.userId);

            const user = await this.userRepository.exists(userId);
            if (!user) {
                throw new Error("User not found");
            }

            const reviews = await this.reviewRepository.findByQuestionsIdAndUserId(questionId, userId);
            if (!reviews) {
                throw new Error("Reviews not found");
            }

            return reviews;
        } catch (error) {
            throw new Error(`Error in FindByQuestionsIdAndUserIdUseCase: ${(error as Error).message}`);
        }
    }
}
