import { Frame, Widget } from "./Widget";
import { HTML } from "../html";


export class Pile extends Frame {
    position(container: HTMLElement, children: Widget[]): void {
        HTML.b({
            p: container,
            ch: [{
                p: {
                    tag: "div",
                    style: {
                        "display": "flex",
                        "flex-direction": "column"
                    }
                },
                ch: children.map((c) => {
                    return c.getDOM();
                })
            }]
        })
    }
}


export class HPile extends Frame {
    position(container: HTMLElement, children: Widget[]): void {
        HTML.b({
            p: container,
            ch: [{
                p: {
                    tag: "div",
                    style: {
                        "display": "flex",
                        "flex-direction": "row"
                    }
                },
                ch: children.map((c) => {
                    return c.getDOM();
                })
            }]
        })
    }
}