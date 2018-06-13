import { Editor } from "./Widget";
import * as JSXFactory from "../JSX/HTMLFactory";


interface Minor {
    min?: number;
    max?: number;
    step?: number;
}
export class NumberEditor extends Editor<number, Minor> {
    inputElement: HTMLInputElement;
    makeContainer() {
        return <input type="number" step={0} />
    }
    init() {
        super.init()
        this.inputElement = this.getDOM() as HTMLInputElement
        this.inputElement.addEventListener("change", () => {
            this.emitDataChange();
        });
    }
    displayData(data: number, minor: Minor): void {
        this.inputElement.value = data.toString();
        if (minor.step !== undefined) {
            this.inputElement.step = minor.step + "";
        }
        if (minor.min !== undefined) {
            this.inputElement.min = minor.min + "";
        }
        if (minor.max !== undefined) {
            this.inputElement.max = minor.max + "";
        }
    }
    getMajorData(): number {
        return parseFloat(this.inputElement.value);
    }
}