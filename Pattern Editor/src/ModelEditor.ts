import { ModuleViewer, ColoredElement } from "./ModuleViewer";
import { Rider, StandardRider, Path, transformModule } from "./SMDL/Utility";
import { ListViewer } from "./Widget/ListViewer";
import { equal, min, max, sum, zip2, requestFile } from "./utility/JSUtility";
import { StringViewer } from "./Widget/StringViewer";
import { NamespaceViewer } from "./NamespaceViewer";
import { Menubar, MenuCommand } from "./Menubar";

import { HTML } from "./html";
import { Controllee, Editor } from "./Widget/Widget";
import { Model, Namespace, Element, ModuleItem, ElementDef, Module } from "./SMDL/SMDL";
import { popup } from "./Widget/Utility";
import { Pile } from "./Widget/Pile";
import { StringEditor } from "./Widget/StringEditor";
import { Button, ButtonCmd } from "./Widget/Button";
import FileSaver = require('file-saver');


type NodePath = {
    kind: "node";
    path: Path;
    index: number;
}
type ElementPath = {
    kind: "element";
    path: Path;
}
interface AlterPath {
    kind: "alternation",
    path: Path
}
interface RepetPath {
    kind: "repetition",
    path: Path
}
export type UPath = NodePath | ElementPath | AlterPath | RepetPath | { kind: "background" };


interface DragCmd {
    kind: "drag";
    path1: UPath;
    path2: UPath;
    ctrlPressed: boolean
}
interface ClickCmd {
    kind: "click";
    path: UPath;
}

export type ModuleEditCmd = InspectElemCmd | CopyElemCmd | MoveElemCmd | LinkCmd | EditAlterCmd | EditRepetCmd | EditElemCmd | EditNodeCmd;
interface InspectElemCmd {
    kind: "insp";
    path: Path;
}
interface CopyElemCmd {
    kind: "copy";
    epath: Path;
    mpath: Path;
    mindex: number;
}
interface MoveElemCmd {
    kind: "move";
    epath: Path;
    mpath: Path;
    mindex: number;
}
interface LinkCmd {
    kind: "link";
    mpath: Path;
    p: number;
    q: number;
}
interface EditAlterCmd {
    kind: "edit-alternation";
    path: Path;
}
interface EditRepetCmd {
    kind: "edit-repetition";
    path: Path;
}
interface EditElemCmd {
    kind: "edit-element";
    path: Path;
}
interface EditNodeCmd {
    kind: "edit-node";
    path: Path;
    index: number;
}


export type NamespaceEditCmd = RedefCmd | DefineCmd;
interface RedefCmd {
    kind: "redef",
    oldName: string;
    newName: string;
    def: ElementDef;
}
interface DefineCmd {
    kind: "define",
    name: string;
    def: ElementDef
}


export class ModelEditor extends Editor<Model> implements Controllee<ModuleEditCmd | MenuCommand | NamespaceEditCmd> {
    private undoCount = 0;
    private undoStack: Model[] = [];
    private redoStack: Model[] = [];
    private handleUndo(): void {
        if (this.undoStack.length > 0) {
            this.redoStack.push(this.getData());
            this.setData(this.undoStack.pop() as Model);
        } else {
            alert("no more undoable action");
        }
    }
    private handleRedo(): void {
        if (this.redoStack.length > 0) {
            this.undoStack.push(this.getData());
            this.setData(this.redoStack.pop() as Model);
        } else {
            alert("no more redoable action");
        }
    }
    private handleNeitherUndoNorRedo(): void {
        this.undoStack.push(this.getData());
        this.redoStack = [];
    }
    interpreteEditNode(path: Path, index: number): void {
        const model = this.getData();
        let insertedElement: string | null = null;
        const chooserHandler = new class implements Controllee<ButtonCmd> {
            handle(cmd: ButtonCmd): void {
                insertedElement = cmd.message;
                popupHandler.handle("close");
            }
        }
        const buttons = Object.keys(model.namespace).map((nm) => {
            const b = new Button();
            b.setData({
                label: nm,
                message: nm
            });
            b.bind(chooserHandler);
            return b;
        });
        const pile = new Pile();
        pile.setChildren(buttons);
        const popupHandler = popup(pile, {
            onclose: () => {
                if (insertedElement) {
                    const rider = new StandardRider(model.root, path);
                    rider.getModule().splice(index, 0, {
                        kind: "element",
                        name: insertedElement
                    });
                    this.setData(model);
                }
            }
        })
    }
    interpreteEditElement(path: Path): void {
        const deleteButton = new Button();
        let deleteFlag = false;
        deleteButton.setData({
            label: HTML.span("delete", { "color": "red" }),
            message: "delete"
        });
        deleteButton.bind(new class implements Controllee<ButtonCmd> {
            handle(cmd: ButtonCmd): void {
                deleteFlag = true;
                popupHandle.handle("close");
            }
        });
        const popupHandle = popup(deleteButton, {
            onclose: () => {
                if (deleteFlag) {
                    // delete Element
                    const data = this.getData();
                    const rider = new StandardRider(data.root, path);
                    console.log(rider.getNodeKind(), rider, path);
                    // return;
                    rider.up()
                    rider.getModule().splice(path[path.length - 1], 1);
                    this.setData(data);
                    return;
                }
            }
        })
    }
    interpreteEditRepetition(path: Path): void {

        class RepetetionEditor extends Editor<number> {
            private editor: StringEditor;
            init() {
                this.editor = new StringEditor();
                this.editor.registerHandler((data) => {
                    this.emitDataChange();
                })
                HTML.b({
                    p: this.getDOM(),
                    ch: [this.editor.getDOM()]
                });
            }
            setData(data: number) {
                this.editor.setData(data.toFixed(3));
            }
            getData(): number {
                return parseFloat(this.editor.getData());
            }
            displayData(container: HTMLElement, data: number): void {
            }
        }

        const data = this.getData();
        const rider = new StandardRider(data.root, path);
        const repet = rider.getRepetition();
        const ed = new RepetetionEditor();
        ed.setData(repet.prob);

        function validProb(p: number) {
            return 0 <= p && p <= 1;
        }

        // delete button
        const btn = new Button();
        let delFlag: boolean = false;
        btn.setData({
            label: HTML.e({
                tag: "span",
                style: {
                    "color": "red"
                },
                ch: ["Delete"]
            }),
            message: "delete"
        });
        btn.bind(new class implements Controllee<ButtonCmd> {
            handle(cmd: ButtonCmd): void {
                delFlag = true;
                popupHandle.handle("close");
            }
        })
        const pile = new Pile();
        pile.setChildren([ed, btn]);

        const popupHandle = popup(pile, {
            onclose: () => {
                if (delFlag) {
                    const path = rider.getPath()
                    const index = path[path.length - 1];
                    rider.up();
                    const m = rider.getModule();
                    m.splice(index, 1);
                    this.setData(data);
                } else {
                    const prob_ = ed.getData();
                    if (validProb(prob_)) {
                        repet.prob = prob_;
                        this.setData(data);
                    } else {
                        alert("invalid probability");
                    }
                }
            }
        });
    }
    interpreteEditAlternation(path: Path): void {

        type AlternationProbs = number[];
        class AlternationProbsEditor extends Editor<AlternationProbs> {
            private pile: Pile;
            private editors: StringEditor[];
            init() {
                this.pile = new Pile();
                HTML.b({
                    p: this.getDOM(),
                    ch: [this.pile.getDOM()]
                });
            }
            displayData(container: HTMLElement, data: number[]): void {
                this.editors = data.map((p) => {
                    const ed = new StringEditor(HTML.box());
                    ed.setData(p.toFixed(3));
                    return ed;
                })
                this.pile.setChildren(this.editors);
            }
            getData(): AlternationProbs {
                return this.editors.map((ed) => {
                    return parseFloat(ed.getData());
                });
            }
        }

        const data = this.getData()
        const rider = new StandardRider(data.root, path);
        const alter = rider.getAlternation();
        const probs = alter.psubs.map(ps => ps.prob);

        const ed = new AlternationProbsEditor(HTML.box());
        ed.setData(probs);
        function validDistribution(dist: number[]) {
            return (dist.every(x => (x >= 0)) && sum(...dist) === 1);
        }
        const btn = new Button();
        let delFlag: boolean = false;
        btn.setData({
            label: HTML.e({
                tag: "span",
                style: {
                    "color": "red"
                },
                ch: ["Delete"]
            }),
            message: "delete"
        });
        btn.bind(new class implements Controllee<ButtonCmd> {
            handle(cmd: ButtonCmd): void {
                delFlag = true;
                popupHandle.handle("close");
            }
        })
        const pile = new Pile();
        pile.setChildren([ed, btn]);
        const popupHandle = popup(pile, {
            onclose: () => {
                if (delFlag) {
                    const path = rider.getPath()
                    const index = path[path.length - 1];
                    rider.up();
                    const m = rider.getModule();
                    m.splice(index, 1);
                    this.setData(data);
                } else {
                    const newDist = ed.getData();
                    if (validDistribution(newDist)) {
                        alter.psubs = zip2(alter.psubs, newDist).map((x) => {
                            const [ps, p] = x;
                            return {
                                prob: p,
                                mod: ps.mod
                            };
                        });
                        this.setData({
                            namespace: data.namespace,
                            root: data.root
                        });
                        return;
                    } else {
                        alert("invalid distribution");
                    }
                }
            }
        });
    }
    interpreteDefineElement(name: string, def: ElementDef): void {
        const data = this.getData();
        if (name.length === 0) {
            alert("name too short");
            return;
        } else if (name in data.namespace) {
            alert("name conflict");
            return;
        } else {
            data.namespace[name] = def;
            this.setData(data);
            return;
        }
    }
    interpreteRedefineElement(oldName: string, newName: string, def: ElementDef): void {
        function redef(ns: Namespace, n1: string, n2: string, def: ElementDef): Namespace {
            delete ns[n1];
            ns[n2] = def;
            return ns;
        }
        function rename(m: Module, n1: string, n2: string): Module {
            return transformModule<Element, Element>(m, (e) => {
                const nm = e.name === n1 ? n2 : e.name;
                return {
                    name: nm
                };
            });
        }
        const data = this.getData();
        return this.setData({
            namespace: redef(data.namespace, oldName, newName, def),
            root: rename(data.root, oldName, newName)
        });
    }
    moduleVr: ModuleViewer;
    namespaceVr: NamespaceViewer;
    constructor(container: HTMLElement) {
        super(container);

        const menubar = new Menubar(HTML.ref("menu"));
        menubar.setData([
            {
                name: "File",
                content: ["New", "Load", "Save"]
            },
            {
                name: "Edit",
                content: ["Undo", "Redo"]
            },
            {
                name: "About",
                content: ["Website"]
            }
        ]);
        menubar.bind(this);

        this.moduleVr = new ModuleViewer(HTML.ref("viewer-wrapper"));
        this.moduleVr.bind(this);

        this.namespaceVr = new NamespaceViewer(HTML.ref("namespace-viewer"));
        this.namespaceVr.bind(this);

        // HTML.inner(container, [ menubar.getContainer(), this.moduleVr.getContainer(), this.namespaceVr.getContainer() ]);
    }
    displayData(container: HTMLElement, data: Model): void {
        this.moduleVr.setData(transformModule<Element, ColoredElement>(data.root, (e: Element) => {
            const name = e.name;
            const elem = data.namespace[name];
            switch (elem.kind) {
                case "motif": {
                    return {
                        type: "motif",
                        name: name,
                        color: elem.color,
                    };
                }
                case "g-motif": {
                    return {
                        type: "g-motif",
                        name: name,
                        dist: elem.distribution,
                        color: elem.color,
                    };
                }
                case "spacer": {
                    return {
                        type: "spacer",
                        name: name
                    };
                }
            }
        }));
        // this.namespaceVr.setData({ ns: data.namespace, elem: Object.keys(data.namespace)[0] })
        this.namespaceVr.setData(data.namespace);
    }
    handle(cmd: MenuCommand | ModuleEditCmd | NamespaceEditCmd): void {
        console.log("ModelEditor", cmd);
        if (cmd.kind === "menu") {
            const cmdString = cmd.firstLevel + "." + cmd.secondLevel;
            if (cmdString === "Edit.Undo") {
                this.handleUndo();
                return;
            } else if (cmdString === "Edit.Redo") {
                this.handleRedo();
                return;
            } else {
                this.handleNeitherUndoNorRedo();
                switch (cmdString) {
                    case "File.New": {
                        this.setData({
                            namespace: {},
                            root: []
                        });
                        return;
                    }
                    case "File.Load": {
                        const file = requestFile((file: File | null) => {
                            if (file) {
                                const reader = new FileReader();
                                reader.addEventListener("load", () => {
                                    const text = reader.result as string;
                                    const json = JSON.parse(text);
                                    this.setData(json as Model);
                                })
                                reader.readAsText(file)
                            }
                        });
                        return;
                    }
                    case "File.Save": {
                        const blob = new Blob([JSON.stringify(this.getData(), null, "\t")], { type: "text/plain;charset=utf-8" });
                        FileSaver.saveAs(blob, "model.json");
                        return;
                    }
                    default: {
                        console.log("unhandled menu command");
                        return;
                    }
                }
            }
        }
        else {
            this.handleNeitherUndoNorRedo();
            switch (cmd.kind) {
                case "insp": {
                    return this.interpreteInspect(cmd.path);
                }
                case "move": {
                    return this.interpreteMoveElementToNode(cmd.epath, cmd.mpath, cmd.mindex);
                }
                case "copy": {
                    return this.interpreteCopyElementToNode(cmd.epath, cmd.mpath, cmd.mindex);
                }
                case "link": {
                    return this.interpreteLinkNodes(cmd.mpath, cmd.p, cmd.q);
                }
                case "edit-alternation": {
                    return this.interpreteEditAlternation(cmd.path);
                }
                case "edit-repetition": {
                    return this.interpreteEditRepetition(cmd.path);
                }
                case "edit-element": {
                    return this.interpreteEditElement(cmd.path);
                }
                case "edit-node": {
                    return this.interpreteEditNode(cmd.path, cmd.index);
                }
                case "redef": {
                    return this.interpreteRedefineElement(cmd.oldName, cmd.newName, cmd.def);
                }
                case "define": {
                    return this.interpreteDefineElement(cmd.name, cmd.def);
                }
                default: {
                    console.log(cmd);
                    return;
                }
            }
        }
    }
    interpreteInspect(path: Path): void {
        const r = new StandardRider(this.data.root, path);
        const name = r.getElementContent().name;
        // this.namespaceVr.setData({
        //     ns: this.data.namespace,
        //     elem: name
        // })
        this.namespaceVr.handle({
            kind: "focus",
            name: name
        });
    }
    interpreteMoveElementToNode(ePath: Path, nPath: Path, nindex: number) {
        const root1 = this.getData().root;
        if (equal(ePath.slice(0, ePath.length - 1), nPath)) {
            // same parent
            const parentPath = nPath;
            const eindex = ePath[ePath.length - 1];
            const m = new StandardRider(root1, parentPath).getModule();
            const e = m[eindex];
            m.splice(eindex, 1);
            m.splice((nindex <= eindex) ? nindex : (nindex - 1), 0, e);
        } else {
            const rider = new StandardRider(root1, ePath.slice(0, ePath.length - 1));
            const m = rider.getModule();
            const eindex = ePath[ePath.length - 1];
            const e = m[eindex];
            m.splice(eindex, 1);
            rider.go(nPath);
            rider.getModule().splice(nindex, 0, e);
        }
        this.setData({
            namespace: this.data.namespace,
            root: root1
        });
    }
    interpreteCopyElementToNode(ePath: Path, nPath: Path, nindex: number) {
        const data = this.getData()
        const root1 = data.root;
        if (equal(ePath.slice(0, ePath.length - 1), nPath)) {
            // same parent
            const parentPath = nPath;
            const eindex = ePath[ePath.length - 1];
            const m = new StandardRider(root1, parentPath).getModule();
            const e = m[eindex];
            m.splice(nindex, 0, e);
        } else {
            const rider = new StandardRider(root1, ePath);
            const e = rider.getItem();
            rider.go(nPath);
            rider.getModule().splice(nindex, 0, e);
        }
        this.setData({
            namespace: data.namespace,
            root: root1
        });
    }
    interpreteLinkNodes(path: Path, p: number, q: number): void {
        const data = this.getData()
        const root1 = data.root;
        const rider = new StandardRider(root1, path);
        const module = rider.getModule();
        const piece = module.slice(min(p, q), max(p, q));
        const item: ModuleItem = ((p < q)
            ? { kind: "alternation", psubs: [{ prob: 0.5, mod: piece }, { prob: 0.5, mod: [] }] }
            : { kind: "repetition", prob: 0.5, sub: piece });
        module.splice(min(p, q), Math.abs(p-q), item);
        return this.setData({
            namespace: data.namespace,
            root: root1
        });
    }
}