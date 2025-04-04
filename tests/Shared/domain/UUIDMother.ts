import { MotherCreator } from "./MotherCreator";

export class UUIDMother {
    static random() {
        return MotherCreator.random().string.uuid(); 
    }
}
