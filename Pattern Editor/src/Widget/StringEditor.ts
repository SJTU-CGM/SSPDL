import { Viewer, Editor } from "./Widget";
import { HTML } from "../html";


type LabeledString = {
    label: string;
    content: string;
};


export class StringEditor extends Editor<string|LabeledString> {
    private inputElement: HTMLInputElement;
    private labelTextElement: HTMLSpanElement;
    constructor(...x: any[]) {
        super(...x);
        const container = this.getDOM();
        this.inputElement = HTML.element("input", {
            "type": "text"
        }) as HTMLInputElement;
        this.labelTextElement = HTML.element("span") as HTMLSpanElement;
        HTML.build({
            p: container,
            ch: [{
                p: HTML.element("label"),
                ch: [ this.labelTextElement, this.inputElement ]
            }]
        });
    }
    displayData(container: HTMLElement, data: string|LabeledString): void {
        this.inputElement.addEventListener("change", ()=>{
            this.emitDataChange();
        });
        if (typeof data === "string") {
            HTML.inner(this.labelTextElement, []);
            this.inputElement.value = data;
        } else {
            HTML.inner(this.labelTextElement, [ data.label + ": " ]);
            this.inputElement.value = data.content;
        }
    }
    getData(): string {
        return this.inputElement.value;
    }
}