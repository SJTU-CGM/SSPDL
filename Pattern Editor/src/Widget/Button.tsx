import { Controller } from "./Widget";
import * as JSXFactory from "../JSX/HTMLFactory";


export interface ButtonCmd {
    kind: "button",
    message: string;
}


interface ButtonData {
    label: string | Node | HTMLElement;
    message: string;
}


export class Button extends Controller<ButtonData, ButtonCmd> {
    protected buttonEl: HTMLElement;
    makeContainer(): HTMLElement {
        return <button style={{width: "100%"}}/>
    }
    displayData(data: ButtonData): void {
        const btn = this.getDOM();
        btn.addEventListener("click", () => {
            this.send({
                kind: "button",
                message: data.message
            });
        })
        JSXFactory.render(this.getDOM(), <span>{data.label}</span>);
    }
}
