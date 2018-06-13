import { Widget, Controllee, Editor } from "./Widget";
import * as JSXFactory from "../JSX/HTMLFactory";
import { Pile, HPile } from "./Pile";
import { StringViewer } from "./StringViewer";


interface ExitItem { label: string | HTMLElement; key: string };
interface Handlers { [key: string]: () => void };
export function popup(widget: Widget, exits: ExitItem[], handlers: Handlers): (key: string) => void {
    const popupBox = (
        <div style={{
            "position": "fixed",
            "width": "100%",
            "height": "100%",
            "top": "0",
            "left": "0",
            "background-color": "rgba(100,100,100,0.5)",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center"
        }}>
            <div style={{
                "background-color": "white",
                "border": "1px solid grey",
                "padding": "1em",
                "max-width": "100%",
                "max-height": "100%",
                "overflow": "auto",
                "display": "flex",
                "flex-direction": "column",
                'align-items': 'center',
                'box-shadow': '0px 0px 3px 3px grey'
            }}>
                <div>
                    {widget.getDOM()}
                </div>
                <div
                    style={{
                        display: "flex",
                        "margin-top": "1em",
                        "flex-direction": "row",
                        "justify-content": "flex-end",
                        "width": '100%'
                    }}
                >
                    {
                        exits.map((action) => {
                            const btn = <button style={{ width: "10em", "margin-left": "1em" }}>{action.label}</button>;
                            btn.addEventListener("click", () => {
                                popupBox.remove();
                                handlers[action.key]();
                            });
                            return btn;
                        })
                    }
                </div>
            </div>
        </div>
    )
    document.body.appendChild(popupBox);
    return (key: string) => {
        popupBox.remove();
        if (handlers[key]) {
            handlers[key]();
            return
        } else {
            console.error(key, handlers)
            throw Error()
        }
    }
}



interface TellCmd {
    kind: "popup";
    command: "close";
}
export function tell(widget: Widget, cypher: string = "OK"): Controllee<TellCmd> {
    const exit = popup(widget,
        [
            {
                label: cypher,
                key: "close"
            }
        ],
        {
            "close": () => {}
        }
    );
    return new class implements Controllee<TellCmd> {
        handle(cmd: TellCmd) {
            exit("close")
        }
    }
}


interface AskCmd {
    kind: "confirm";
    command: "ok" | "cancel";
}
export function ask(widget: Widget, handlers: { cancel: () => void; ok: () => void }): Controllee<AskCmd> {
    const exit = popup(widget,
        [
            {
                label: <span style={{ color: "green" }}>Ok</span>,
                key: "ok"
            },
            {
                label: "Cancel",
                key: "cancel"
            }
        ],
        handlers
    );
    return new class implements Controllee<AskCmd> {
        handle(cmd: AskCmd) {
            if (cmd.command === "ok") {
                exit("ok")
            } else if (cmd.command === "cancel") {
                exit("cancel");
            }
        }
    }
}


export function simpleAsk<Data>(question: string, ed: Editor<Data, any>, success: (d: Data) => void, fail: ()=>void) {
    const vr = new StringViewer();
    vr.initData(question)
    const pile = new Pile()
    pile.setChildren([vr, ed]);
    ask(pile, {
        ok: () => {
            success(ed.getMajorData());
        },
        cancel: () => {
            fail();
        }
    })
}