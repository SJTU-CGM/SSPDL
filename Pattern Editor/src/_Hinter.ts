import { HTML } from "./html";
import { Viewer } from "./Widget/Widget";


export type HintData = {
    type: string;
    message: string;
}


export class HintViewer extends Viewer<HintData> {
    hintTypeElement : HTMLElement;
    hintMessageElement : HTMLElement;
    constructor(container: HTMLElement) {
        super(container);
        this.hintTypeElement = HTML.element("span", {}, {}, [""]);
        this.hintMessageElement = HTML.element("span", {}, {}, [""]);
        HTML.build({
            p: container,
            ch: [
                this.hintTypeElement, ": ", this.hintMessageElement
            ]
        })
    }
    displayData(container: HTMLElement, data: HintData): void {
        HTML.inner(this.hintTypeElement, [ data.type ]);
        HTML.inner(this.hintMessageElement, [ data.message ]);
    }
}