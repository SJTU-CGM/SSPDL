import { HTML } from "../html";
import { Editor } from "./Widget";


export type ColorData = string;


export class ColorEditor extends Editor<ColorData> {
    inputElement: HTMLInputElement;
    constructor(container: HTMLElement, label?: string) {
        super(container);
        this.inputElement = HTML.element("input", {
            "type": "color"
        }) as HTMLInputElement;
        this.inputElement.addEventListener("change", ()=>{
            this.emitDataChange();
        });
        label = label ? (label + ": ") : "";
        HTML.build({
            p: container,
            ch: [
                {
                    p: HTML.element("label"),
                    ch: [ label, this.inputElement ]
                }
            ]
        });
    }
    displayData(container: HTMLElement, data: ColorData): void {
        this.inputElement.value = data;
    }
    getData(): ColorData {
        return this.inputElement.value;
    }
}