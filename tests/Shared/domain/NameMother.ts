import { MotherCreator } from "./MotherCreator";

export class NameMother {
    static random() {
        return MotherCreator.random().name.firstName();
    }
}
