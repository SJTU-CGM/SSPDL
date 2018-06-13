import { Frame, Widget } from "./Widget";
import * as JSXFactory from "../JSX/HTMLFactory";


export class Pile extends Frame {
    protected position(container: HTMLElement, children: Widget[]): void {
        JSXFactory.render(container, (
            <div style={{ "display": "flex", "flex-direction": "column" }}>
                { children.map((ch) => (ch.getDOM())) }
            </div>
        ));
    }
}


export class HPile extends Frame {
    protected position(container: HTMLElement, children: Widget[]): void {
        JSXFactory.render(container, (
            <div style={{ "display": "flex", "flex-direction": "row" }}>
                { children.map((ch) => (ch.getDOM())) }
            </div>
        ));
    }
}
