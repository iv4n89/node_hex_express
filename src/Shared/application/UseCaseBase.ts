export default abstract class UseCaseBase<I, O> {
  abstract execute(input: I): Promise<O>;
}
