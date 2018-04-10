import { Widget, Controllee } from "./Widget";
import { HTML } from "../html";


export function popup(widget: Widget, handlers: { onclose: ()=>void }): Controllee<"close"> {
    const box = HTML.b({
        tag: "div",
        style: {
            "position": "fixed",
            "width": "100%",
            "height": "100%",
            "top": "0",
            "left": "0",
            "background-color": "rgba(100,100,100,0.5)",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center"
        },
        ch: [
            {
                tag: "div",
                style: {
                    "background-color": "white",
                    "border": "1px solid black",
                    "padding": "1em"
                },
                ch: [ widget.getDOM() ]
            }
        ]
    });
    const close = () => {
        HTML.body().removeChild(box);
        handlers.onclose();
    }
    box.addEventListener("click", (e)=>{
        if (e.target === box) {
            close();
        }
    })
    HTML.body().appendChild(box);
    return new (class implements Controllee<"close"> {
        handle(cmd: "close"): void {
            close();
        }
    });
}


export function confirm(widget: Widget, handlers: { cancel: () => void; ok: () => void }): Controllee<"close"> {
    const okButton = HTML.e({
        tag: "button",
        attr: {
            "type": "button"
        },
        style: {
            "color": "green",
            "width": "100%"
        },
        ch: [ "OK" ]
    });
    const box = HTML.b({
        tag: "div",
        style: {
            "position": "fixed",
            "width": "100%",
            "height": "100%",
            "top": "0",
            "left": "0",
            "background-color": "rgba(100,100,100,0.5)",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center"
        },
        ch: [
            {
                tag: "div",
                style: {
                    "background-color": "white",
                    "border": "1px solid black",
                    "padding": "1em"
                },
                ch: [
                    widget.getDOM(),
                    okButton
                ]
            }
        ]
    });
    const remove = () => {
        HTML.body().removeChild(box);
    }
    const close = () => {
        remove();
        handlers.cancel();
    }
    okButton.addEventListener("click", ()=>{
        remove();
        handlers.ok();
    })
    box.addEventListener("click", (e)=>{
        if (e.target === box) {
            close();
        }
    })
    HTML.body().appendChild(box);
    return new (class implements Controllee<"close"> {
        handle(cmd: "close"): void {
            close();
        }
    });
}