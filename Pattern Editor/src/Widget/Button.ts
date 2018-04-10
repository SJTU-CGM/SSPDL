import { Controller, $Controller, Viewer, Controller_, classof } from "./Widget";
import { HTML } from "../html";


export interface ButtonCmd {
    kind: "button",
    message: string;
}


interface ButtonData {
    label: string | Node | HTMLElement;
    message: string;
}


class ButtonBase extends Viewer<ButtonData> {
    protected buttonEl: HTMLElement;
    init() {
        super.init();
        this.buttonEl = HTML.element("button", {}, {})
        HTML.b({
            p: this.getDOM(),
            ch: [ this.buttonEl ]
        })
    }
    displayData(container: HTMLElement, data: ButtonData): void {
        HTML.b({
            p: this.buttonEl,
            ch: [data.label]
        });
    }
}


export class Button extends $Controller<classof<ButtonBase>, ButtonCmd>(ButtonBase) {
    init() {
        super.init();
        this.buttonEl.addEventListener("click", () => {
            this.send({
                kind: "button",
                message: this.getData().message
            })
        })
    }
}



// class Button extends Viewer<ButtonData> implements Controller_<Cmd> {
//     displayData(container: HTMLElement, data: ButtonData): void {
//         const btn = HTML.element("button", {}, {}, [data.label]);
//         btn.addEventListener("click", () => {
//             this.send({
//                 kind: "button",
//                 message: data.message
//             });
//         });
//         HTML.inner(container, [btn]);
//     }
// }