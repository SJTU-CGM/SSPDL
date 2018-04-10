import { Viewer } from "./Widget";
import { HTML } from "../html";

export class ListViewer<I> extends Viewer<I[]> {
    private itemViewer: new (e: HTMLElement, d: I) => Viewer<I>;
    constructor(container: HTMLElement, itemViewer: new (e: HTMLElement, d: I) => Viewer<I>) {
        super(container);
        this.itemViewer = itemViewer;
    }
    displayData(container: HTMLElement, data: I[]): void {
        const children: HTMLElement[] = [];
        for (const item of data) {
            const e = HTML.element("div", {
                "style": "border: 1px solid black;"
            });
            const ev = new this.itemViewer(e, item);
            children.push(e);
        }
        HTML.build({
            p: container,
            ch: children
        });
    }
}