import { Editor } from "./Widget";
import * as JSXFactory from "../JSX/HTMLFactory";


type Color = string;
export class ColorEditor extends Editor<Color, void> {
    inputElement: HTMLInputElement;
    makeContainer() {
        return <input type="color" />
    }
    init() {
        super.init()
        this.inputElement = this.getDOM() as HTMLInputElement;
        this.inputElement.addEventListener("change", () => {
            this.emitDataChange();
        });
    }
    displayData(data: Color): void {
        this.inputElement.value = data;
    }
    getMajorData(): Color {
        return this.inputElement.value;
    }
}