import { Module, ModuleItem } from "./SMDL/SMDL";
import { HTML } from "./html";
import { Viewer, Editor, Controller, Controllee } from "./Widget/Widget";
import { ListViewer } from "./Widget/ListViewer";
import { StringViewer } from "./Widget/StringViewer";
import { MotifEditor } from "./MotifEditor";
import { SpacerEditor } from "./SpacerEditor";
import { ElementEditor } from "./ElementEditor";


import { Namespace } from "./SMDL/SMDL";
import { NamespaceEditCmd } from "./ModelEditor";
export { NamespaceViewer };


type FocusableNamespace = {
    ns: Namespace;
    elem: string;
};


type ElementList = string[];
type FocusElement = {
    kind: "focus"
    name: string;
}
class NameListViewer extends Controller<ElementList, FocusElement> {
    displayData(container: HTMLElement, data: string[]): void {
        HTML.inner(container, data.map((elem) => {
            const e = HTML.element("div",
                {
                    "class": "w3-button"
                },
                {
                    "border-bottom": "1px solid grey"
                },
                [elem]
            )
            e.addEventListener("click", () => {
                this.send({
                    kind: "focus",
                    name: elem
                });
            });
            return e;
        }));
    }
}


class InspectorToolbar extends Controller<string[], string> {
    displayData(container: HTMLElement, data: string[]): void {
        HTML.inner(container, data.map((toolname) => {
            const e = HTML.element("button", {
                "class": "w3-button w3-border w3-small w3-teal"
            }, {}, [toolname]);
            e.addEventListener("click", () => {
                this.send(toolname);
            })
            return e;
        }))
    }
}


// class NamespaceViewer extends Controller<FocusableNamespace, NamespaceEditCmd> implements Controllee<string>, Controllee<FocusElement> {
class NamespaceViewer extends Controller<Namespace, NamespaceEditCmd> implements Controllee<string | FocusElement> {
    handleNewMotif(): void {

        const defineMotif = (name: string) => {
            const data = this.getData();
            this.send({
                kind: "define",
                name: name,
                def: {
                    kind: "motif",
                    color: "#ffffff",
                    matrix: []
                }
            });
        }

        const name = window.prompt("The name of the new motif:");
        if (name !== null) {
            defineMotif(name);
        }
    }
    handleNewGMotif(): void {

        const defineMotif = (name: string) => {
            const data = this.getData();
            this.send({
                kind: "define",
                name: name,
                def: {
                    kind: "g-motif",
                    distribution: { from: 0, probs: [1] },
                    color: "#ffffff",
                    matrix: []
                }
            });
        }

        const name = window.prompt("The name of the new g-motif:");
        if (name !== null) {
            defineMotif(name);
        }
    }
    handleNewSpacer(): void {

        const defineSpacer = (name: string) => {
            const data = this.getData();
            this.send({
                kind: "define",
                name: name,
                def: {
                    kind: "spacer",
                    distribution: { from: 0, probs: [1] },
                }
            });
        }

        const name = window.prompt("The name of the new spacer:");
        if (name !== null) {
            defineSpacer(name);
        }
    }
    private nameListViewer: NameListViewer;
    private elementEditor: ElementEditor;
    private focus: string;
    constructor(container: HTMLElement) {
        super(container);
        container.setAttribute("style", HTML.style({
            "display": "flex",
            "flex-direction": "row"
        }));
        const nameListEl = HTML.element("div", {
            "style": HTML.style({
                "flex-grow": "2",
                "width": "10em",
                "display": "flex",
                "flex-direction": "column"
            })
        });
        const toolbarEl = HTML.element("div", {
            "class": "w3-bar w3-teal"
        }, {
                "flex-shrink": "0",
                "padding": "0.2em"
            });
        const elementEl = HTML.element("div", {}, {
            "overflow-y": "scroll",
            "flex-grow": "2"
        });

        const newMotifEl = HTML.element("div", {
            "class": "w3-button w3-border"
        }, {}, ["New Motif"]);
        newMotifEl.addEventListener("click", () => {
            this.handleNewMotif();
        });

        const newGMotifEl = HTML.element("div", {
            "class": "w3-button w3-border"
        }, {}, ["New G-Motif"]);
        newGMotifEl.addEventListener("click", () => {
            this.handleNewGMotif();
        });

        const newSpacerEl = HTML.element("div", {
            "class": "w3-button w3-border"
        }, {}, ["New Spacer"]);
        newSpacerEl.addEventListener("click", () => {
            this.handleNewSpacer();
        });


        HTML.build({
            p: container,
            ch: [
                {
                    p: HTML.element("div", {}, {
                        "display": "flex",
                        "flex-direction": "column"
                    }),
                    ch: [nameListEl, newMotifEl, newGMotifEl, newSpacerEl]
                },
                HTML.element("div", {}, {
                    "display": "flex",
                    "flex-direction": "column"
                }, [toolbarEl, elementEl])
            ]
        });

        // setup name list
        this.nameListViewer = new NameListViewer(nameListEl);
        this.nameListViewer.bind(this);

        // setup toolbar
        const toolbar = new InspectorToolbar(toolbarEl);
        toolbar.setData(["save", "reset", "delete"]);
        toolbar.bind(this);

        this.elementEditor = new ElementEditor(elementEl);
    }
    handle(cmd: string | FocusElement): void {
        console.log("NSViewer", cmd);
        if (typeof cmd === "string") {
            switch (cmd) {
                case "save": {
                    const data = this.getData();
                    const edata = this.elementEditor.getData();
                    return this.send({
                        kind: "redef",
                        oldName: this.focus,
                        newName: edata.name,
                        def: edata.def
                    });
                }
                case "reset": {
                    const data = this.getData();
                    return this.elementEditor.setData({
                        name: this.focus,
                        def: data[this.focus]
                    });
                }
                case "delete": {
                    return;
                }
                default: {
                    throw new Error();
                }
            }
        } else {
            // this.setData({
            //     ns: this.getData().ns,
            //     elem: cmd.name
            // });
            this.focus = cmd.name;
            this.displayData(this.dom, this.data);
        }
    }
    // displayData(container: HTMLElement, data: { ns: Namespace; elem: string; }): void {
    displayData(container: HTMLElement, data: Namespace) {
        const names = Object.keys(data).sort();
        if (this.focus && data[this.focus]) {
            this.nameListViewer.setData(names);
            this.elementEditor.setData({
                name: this.focus,
                def: data[this.focus]
            });
        } else {
            this.nameListViewer.setData(names);
        }
    }
}
