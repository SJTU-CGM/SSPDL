import { Widget } from "./Widget";


export class Wrapper extends Widget {
    private content: HTMLElement;
    constructor(content: HTMLElement) {
        super();
        this.content = content;
    }
    getDOM(): HTMLElement {
        return this.content;
    }
}