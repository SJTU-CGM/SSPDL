import * as JSXFactory from "../JSX/HTMLFactory";

import { ModuleViewer, ColoredElement } from "./ModuleViewer";
import { Rider, StandardRider, Path, transformModule, tranverseModule } from "../SSPDL/Utility";
import { equal, min, max, sum, zip2, requestFile, copy, floatEqual } from "../JSUtility";
import { StringViewer } from "../Widget/StringViewer";
import { Menubar, MenubarCommand } from "../Widget/Menubar";

import { Controllee, Editor } from "../Widget/Widget";
import { Model, Namespace, Element, ModuleItem, ElementDef, Module, Alphabet, CodeDistribution, ElementKind } from "../SSPDL/SSPDL";
import { tell, popup, ask } from "../Widget/Utility";
import { Pile, HPile } from "../Widget/Pile";
import { StringEditor } from "../Widget/StringEditor";
import { Button, ButtonCmd } from "../Widget/Button";
import FileSaver = require('file-saver');
import { NumberEditor } from "../Widget/NumberEditor";
import { BackgroundDistributionEditor } from "./BackgroundDistributionEditor";
import { Wrapper } from "../Widget/Wrapper";
import { IndexViewer, Index, IndexItem, IndexCmd } from "./IndexViewer";
import { DefinitionViewer, ChangeDefinitionCmd, Definition } from "./DefinitionViewer";
import { ElementDefEditor } from "./ElementDefEditor";
import { CSV } from "../CSV";


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


type GlobalEditCmd = RenameCmd
interface RenameCmd {
    kind: "rename-element"
    oldName: string
    newName: string
}



export interface ElementUse {
    [key: string]: number;
}



class ProbabilityEditor extends NumberEditor {
    initData(data: number, extra: { min?: number; max?: number; step?: number; } = { min: 0, max: 1, step: 0.001 }) {
        super.initData(data, extra);
    }
}


export class ModelEditor extends Editor<Model, void> implements Controllee<ModuleEditCmd | MenubarCommand | ChangeDefinitionCmd | IndexCmd> {
    interpreteNewElement(elementKind: ElementKind): void {
        const model = this.getMajorData()
        const namespace: Namespace = model.namespace;
        switch (elementKind) {
            case ElementKind.Motif: {
                const name = window.prompt("The name of new motif:");
                if (name !== null && name.length > 0) {
                    if (namespace[name] !== undefined) {
                        alert("Duplicated definition for " + name)
                    } else {
                        namespace[name] = {
                            kind: ElementKind.Motif,
                            color: "#888888",
                            matrix: []
                        }
                        this.updateMajorData(model)
                        this.handle({
                            kind: "focus",
                            name: name
                        })
                    }
                }
                return;
            }
            case ElementKind.GMotif: {
                const name = window.prompt("The name of new generalized motif:");
                if (name !== null && name.length > 0) {
                    if (namespace[name] !== undefined) {
                        alert("Duplicated definition for " + name)
                    } else {
                        namespace[name] = {
                            kind: ElementKind.GMotif,
                            distribution: { from: 1, probs: [1] },
                            color: "#000000",
                            matrix: []
                        }
                        this.updateMajorData(model)
                        this.handle({
                            kind: "focus",
                            name: name
                        })
                    }
                }
                return
            }
            case ElementKind.Spacer: {
                const name = window.prompt("The name of new spacer:");
                if (name !== null && name.length > 0) {
                    if (namespace[name] !== undefined) {
                        alert("Duplicated definition for " + name)
                    } else {
                        namespace[name] = {
                            kind: ElementKind.Spacer,
                            distribution: { from: 1, probs: [1] },
                        }
                        this.updateMajorData(model)
                        this.handle({
                            kind: "focus",
                            name: name
                        })
                    }
                }
                return
            }
        }
    }
    interpreteFocus(name: string): void {
        const model = this.getMajorData()
        if (model.namespace[name] !== undefined) {
            let useless = false
            tranverseModule(model.root, (e) => {
                if (e.name === name) {
                    useless = true
                }
            })
            this.definitionViewer.initData({
                name: name,
                useless: useless
            })
            this.elementDefEr.initData(model.namespace[name], {
                alphabet: model.alphabet,
                background: model.background
            })
        } else {
            this.definitionViewer.initData(null)
            this.elementDefEr.initData(null, {
                alphabet: model.alphabet,
                background: model.background
            })
        }
    }
    interpreteRenameDef(oldName: string, newName: string): void {
        const model = this.getMajorData()
        if (model.namespace[newName] !== undefined) {
            alert("The new name is already in use.")
            return
        } else {
            model.namespace[newName] = model.namespace[oldName]
            delete model.namespace[oldName]
            model.root = transformModule(model.root, (e) => {
                if (e.name === oldName) {
                    return {
                        name: newName
                    }
                } else {
                    return e;
                }
            })
            this.updateMajorData(model)
            this.handle({
                kind: "focus",
                name: newName
            })
            return
        }
    }
    private backgroundEr: BackgroundDistributionEditor;
    private undoCount = 0;
    private undoStack: Model[] = [];
    private redoStack: Model[] = [];
    private handleUndo(): void {
        if (this.undoStack.length > 0) {
            this.redoStack.push(this.getMajorData());
            this.updateMajorData(this.undoStack.pop() as Model);
        } else {
            alert("no more undoable action");
        }
    }
    private handleRedo(): void {
        if (this.redoStack.length > 0) {
            this.undoStack.push(this.getMajorData());
            this.updateMajorData(this.redoStack.pop() as Model);
        } else {
            alert("no more redoable action");
        }
    }
    private handleNeitherUndoNorRedo(): void {
        this.undoStack.push(this.getMajorData());
        this.redoStack = [];
    }
    private alphabet: Alphabet;
    interpreteEditNode(path: Path, index: number): void {
        const insertableElements = Object.keys(this.getMajorData().namespace);
        const that = this;
        const insertionControllee = new class implements Controllee<ButtonCmd> {
            handle(cmd: ButtonCmd): void {
                // insert element to node at *path*.
                const model = that.getMajorData();
                const rider = new StandardRider(model.root, path);
                rider.getModule().splice(index, 0, {
                    kind: "element",
                    name: cmd.message
                });
                that.updateMajorData(model);
                // close the popup
                popupConrollee.handle({
                    kind: "popup",
                    command: "close"
                });
            }
        }
        const widget = new Pile();
        widget.setChildren([
            new Wrapper(<span>You may insert one of the elements.</span>),
            ...insertableElements.map((name) => {
                const btn = new Button()
                btn.initData({
                    label: name,
                    message: name
                })
                btn.bind(insertionControllee)
                return btn
            })
        ])
        const popupConrollee = tell(widget, "Cancel");
    }
    interpreteEditElement(path: Path): void {
        const widget = new StringViewer()
        widget.initData("You may delete this element.");
        popup(widget,
            [
                { label: <span style={{ "color": 'red' }}>Delete</span>, key: "delete" },
                { label: "Cancel", key: "cancel" }
            ],
            {
                delete: () => {
                    const data = this.getMajorData();
                    const rider = new StandardRider(data.root, path);
                    console.log(rider.getNodeKind(), rider, path);
                    // return;
                    rider.up()
                    rider.getModule().splice(path[path.length - 1], 1);
                    this.updateMajorData(data);
                    return;
                },
                cancel: () => { }
            }
        )
    }
    interpreteEditRepetition(path: Path): void {

        class RepetetionEditor extends Editor<number, void> {
            private editor: ProbabilityEditor;
            init() {
                this.editor = new ProbabilityEditor();
                JSXFactory.render(this.getDOM(),
                    <label>Pr(looping back) = {this.editor.getDOM()}</label>
                );
            }
            getMajorData(): number {
                return this.editor.getMajorData();
            }
            displayData(data: number): void {
                this.editor.initData(data);
            }
        }

        const data = copy(this.getMajorData())
        const rider = new StandardRider(data.root, path);
        const repet = rider.getRepetition();
        const ed = new RepetetionEditor();
        ed.initData(repet.prob, undefined);

        popup(ed,
            [
                { label: <span style={{ "color": "green" }}>Submit</span>, key: "submit" },
                { label: <span style={{ "color": "red" }}>Delete</span>, key: "delete" },
                { label: "Cancel", key: "cancel" }
            ],
            {
                "submit": () => {
                    const prob = ed.getMajorData();
                    if (0 <= prob && prob <= 1) {
                        repet.prob = prob;
                        this.updateMajorData(data);
                    } else {
                        alert("invalid probability");
                    }
                },
                "delete": () => {
                    const path = rider.getPath()
                    const index = path[path.length - 1];
                    rider.up();
                    const m = rider.getModule();
                    m.splice(index, 1);
                    this.updateMajorData(data);
                },
                "cancel": () => { }
            }
        )
    }
    interpreteEditAlternation(path: Path): void {
        type AlternationProbs = number[];
        class AlternationEditor extends Editor<AlternationProbs, void> implements Controllee<ButtonCmd> {
            handle(cmd: ButtonCmd): void {
                switch (cmd.message) {
                    case 'add': {
                        this.updateMajorData(this.getMajorData().concat([0]))
                        return;
                    }
                    case 'del': {
                        let d = this.getMajorData()
                        this.updateMajorData(d.slice(0, d.length - 1))
                        return
                    }
                    case 'csv': {
                        let d = this.getMajorData()
                        let csvText = CSV.dump({
                            head: ['Pr'],
                            body: d.map((p)=> ({'Pr': p}))
                        })
                        const textarea = <textarea cols="30" rows="10"></textarea> as HTMLTextAreaElement;
                        textarea.value = csvText;
                        ask(new Wrapper(textarea), {
                            ok: () => {
                                const csv = CSV.parse(textarea.value);        
                                if (equal(csv.head, ['Pr'])) {
                                    this.updateMajorData(csv.body.map((r)=>(r['Pr'])))
                                } else {
                                    alert("You must not change the header.")
                                }
                            },
                            cancel: () => { }
                        })
                        return;
                    }
                    default: {
                        throw null;
                    }
                }
            }
            private pile: Pile;
            private editors: ProbabilityEditor[];
            init() {
                this.pile = new Pile();
                JSXFactory.render(this.getDOM(), this.pile.getDOM());
            }
            displayData(data: number[]): void {
                this.editors = data.map((p) => {
                    const ed = new ProbabilityEditor();
                    ed.initData(p);
                    return ed;
                })
                // add/delete row
                const addRowBtn = new Button();
                const deleteRowBtn = new Button();
                addRowBtn.initData({
                    label: "+",
                    message: "add"
                })
                deleteRowBtn.initData({
                    label: "-",
                    message: "del"
                })
                addRowBtn.bind(this);
                deleteRowBtn.bind(this);
                let hp = new HPile()
                hp.setChildren([addRowBtn, deleteRowBtn]);
                // input/output as CSV
                const ioBtn = new Button();
                ioBtn.initData({
                    label: "To/From CSV",
                    message: "csv"
                })
                ioBtn.bind(this)
                this.pile.setChildren([
                    ...this.editors.map((ed, i) => {
                        return new Wrapper(<label>{i.toString() + ": "}{ed.getDOM()}</label>)
                    }),
                    hp,ioBtn
                ]);
            }
            getMajorData(): AlternationProbs {
                return this.editors.map((ed) => {
                    return ed.getMajorData();
                });
            }
        }

        const module = copy(this.getMajorData())
        const rider = new StandardRider(module.root, path);
        const alter = rider.getAlternation();
        const probs = alter.psubs.map(ps => ps.prob);

        const ed = new AlternationEditor();
        ed.initData(probs, undefined);

        function validateDistribution(dist: number[]) {
            let s = 0;
            let i = 0;
            for (let n of dist) {
                if (typeof n != 'number') {
                    throw Error('The ' + i + '-th item is not a number.')
                }
                if (! (0 <= n && n <= 1)) {
                    throw Error('The ' + i + '-th number goes out of range 0~1 (' + n + ').')
                }
                s += n;
                i ++;
            }
            if (! floatEqual(s, 1)) {
                throw Error('The sum of probability does not sum up to 1.')
            }
        }
        popup(ed,
            [
                { label: <span style={{ "color": "green" }}>Submit</span>, key: "submit" },
                { label: <span style={{ "color": "red" }}>Delete</span>, key: "delete" },
                { label: "Cancel", key: "cancel" }
            ],
            {
                "submit": () => {
                    const newDist = ed.getMajorData();
                    try {
                        validateDistribution(newDist);
                        let psubs = []
                        for (let i = 0; i < newDist.length; i++) {
                            psubs.push({
                                prob: newDist[i],
                                mod: (i < alter.psubs.length) ? alter.psubs[i].mod : []
                            })
                        }
                        alter.psubs = psubs
                        this.updateMajorData(module)
                    }
                    catch (e) {
                        alert(e.message)
                    }
                },
                "delete": () => {
                    const path = rider.getPath()
                    const index = path[path.length - 1];
                    rider.up();
                    const m = rider.getModule();
                    m.splice(index, 1);
                    this.updateMajorData(module);
                },
                "cancel": () => { }
            }
        )
    }
    interpreteDeleteDef(name: string) {
        let useless = true
        const model = this.getMajorData()
        console.log(model, name)
        tranverseModule(model.root, (e) => {
            if (e.name === name) {
                useless = false
            }
        })
        if (useless) {
            delete model.namespace[name]
            this.updateMajorData(model)
            this.handle({
                kind: "focus",
                name: ""
            })
            return
        } else {
            alert("This element is still in use, so you cannot delete it.")
            return
        }
    }
    moduleVr: ModuleViewer;
    indexViewer: IndexViewer;
    definitionViewer: DefinitionViewer;
    elementDefEr: ElementDefEditor;
    makeContainer(): HTMLElement {
        return (
            <div
                style={{
                    display: "flex",
                    "flex-direction": "column",
                    height: "100%"
                }}
            ></div>
        )
    }
    init() {
        super.init();

        const menubar = new Menubar();
        menubar.initData([
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

        this.moduleVr = new ModuleViewer();
        this.moduleVr.bind(this);

        this.elementDefEr = new ElementDefEditor()
        this.elementDefEr.register(this, (def) => {
            if (def !== null) {
                const model = this.getMajorData()
                const name = (this.definitionViewer.getData() as { name: string }).name
                model.namespace[name] = def
                this.updateMajorData(model)
            }
        })

        this.definitionViewer = new DefinitionViewer()
        this.definitionViewer.bind(this)

        this.indexViewer = new IndexViewer()
        this.indexViewer.bind(this)

        this.backgroundEr = new BackgroundDistributionEditor();

        JSXFactory.render(this.getDOM(),
            <div style={{ "flex-grow": "0" }}>{menubar.getDOM()}</div>,
            <div style={{ "flex-grow": "0" }}>{this.backgroundEr.getDOM()}</div>,
            <div style={{ "flex-grow": "1", "height": "30%", "overflow": "auto" }}>{this.moduleVr.getDOM()}</div>,
            <div style={{ "flex-grow": "1", "height": "50%" }}>
                <div
                    style={{
                        "display": "flex",
                        "flex-direction": "row",
                        "border-top": "1px solid black",
                        "height": "100%"
                    }}
                >
                    {this.indexViewer.getDOM()}
                    <div
                        style={{
                            "flex-grow": "1",
                            "border-left": "1px solid black",
                            "overflow-y": "scroll"
                        }}
                    >
                        {this.definitionViewer.getDOM()}
                        {this.elementDefEr.getDOM()}
                    </div>
                </div>
            </div>
        )
    }
    displayData(data: Model): void {
        function getElementUse(module: Module): { [key: string]: number } {
            const elementUse: { [key: string]: number } = {};
            const rider = new StandardRider(data.root);
            function walk(rider: StandardRider) {
                if (rider.isElement()) {
                    const name = rider.getElementContent().name;
                    elementUse[name] = (elementUse[name] || 0) + 1;
                } else {
                    for (const r of rider.getChildRiders()) {
                        walk(r);
                    }
                }
            }
            walk(rider);
            return elementUse
        }
        this.alphabet = data.alphabet
        this.moduleVr.initData(transformModule<Element, ColoredElement>(data.root,
            (e: Element): ColoredElement => {
                const name = e.name;
                const elem = data.namespace[name];
                switch (elem.kind) {
                    case ElementKind.Motif: {
                        return {
                            type: ElementKind.Motif,
                            name: name,
                            color: elem.color,
                        } as ColoredElement;
                    }
                    case ElementKind.GMotif: {
                        return {
                            type: ElementKind.GMotif,
                            name: name,
                            dist: elem.distribution,
                            color: elem.color,
                        } as ColoredElement;
                    }
                    case ElementKind.Spacer: {
                        return {
                            type: ElementKind.Spacer,
                            name: name
                        } as ColoredElement;
                    }
                    default: {
                        throw new Error()
                    }
                }
            })
        );
        const elementUse = getElementUse(data.root);
        const makeIndex = (data: Namespace, alphabet: Alphabet, elementUse: ElementUse): Index => {
            const index: Index = []
            const makeIndexItem = (name: string, def: ElementDef): IndexItem => {
                switch (def.kind) {
                    case "motif": {
                        return {
                            name: name,
                            kind: ElementKind.Motif,
                            color: def.color,
                            useCount: elementUse[name] || 0
                        }
                    }
                    case "g-motif": {
                        return {
                            name: name,
                            kind: ElementKind.GMotif,
                            color: def.color,
                            useCount: elementUse[name] || 0
                        }
                    }
                    case "spacer": {
                        return {
                            name: name,
                            kind: ElementKind.Spacer,
                            useCount: elementUse[name] || 0
                        }
                    }
                    default: {
                        throw new Error("internal")
                    }
                }
            }
            for (const name of Object.keys(data).sort()) {
                index.push(makeIndexItem(name, data[name]))
            }
            return index;
        }
        this.indexViewer.initData(makeIndex(data.namespace, data.alphabet, elementUse))

        this.backgroundEr.initData(data.background, {
            alphabet: this.alphabet
        })
    }
    getMajorData(): Model {
        return copy(super.getMajorData())
    }
    handle(cmd: MenubarCommand | ModuleEditCmd | ChangeDefinitionCmd | IndexCmd): void {
        if (cmd.kind === "menubar") {
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
                        const alphabet = "ACGT".split("");
                        const bgd: CodeDistribution = {};
                        for (const code of alphabet) {
                            bgd[code] = 1 / alphabet.length;
                        }
                        this.updateMajorData({
                            namespace: {},
                            background: bgd,
                            alphabet: alphabet,
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
                                    this.updateMajorData(json as Model);
                                })
                                reader.readAsText(file)
                            }
                        });
                        return;
                    }
                    case "File.Save": {
                        const blob = new Blob([JSON.stringify(this.getMajorData(), null, "\t")], { type: "text/plain;charset=utf-8" });
                        FileSaver.saveAs(blob, "model.json");
                        return;
                    }
                    default: {
                        console.log("unhandled menu command");
                        return;
                    }
                }
            }
        } else {
            this.handleNeitherUndoNorRedo();
            switch (cmd.kind) {
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
                case "delete-def": {
                    return this.interpreteDeleteDef(cmd.name);
                }
                case "rename-def": {
                    return this.interpreteRenameDef(cmd.oldName, cmd.newName);
                }
                case "focus": {
                    return this.interpreteFocus(cmd.name)
                }
                case "new-element": {
                    return this.interpreteNewElement(cmd.elementKind)
                }
                default: {
                    console.log(cmd);
                    return;
                }
            }
        }
    }
    interpreteMoveElementToNode(ePath: Path, nPath: Path, nindex: number) {
        const root1 = this.getMajorData().root;
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
        const model = this.getMajorData()
        model.root = root1
        this.updateMajorData(model);
    }
    interpreteCopyElementToNode(ePath: Path, nPath: Path, nindex: number) {
        const data = this.getMajorData()
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
        this.updateMajorData({
            alphabet: this.alphabet,
            namespace: data.namespace,
            background: data.background,
            root: root1
        });
    }
    interpreteLinkNodes(path: Path, p: number, q: number): void {
        const data = this.getMajorData()
        const root1 = data.root;
        const rider = new StandardRider(root1, path);
        const module = rider.getModule();
        const piece = module.slice(min(p, q), max(p, q));
        const item: ModuleItem = ((p < q)
            ? { kind: "alternation", psubs: [{ prob: 0.5, mod: piece }, { prob: 0.5, mod: [] }] }
            : { kind: "repetition", prob: 0.5, sub: piece });
        module.splice(min(p, q), Math.abs(p - q), item);
        return this.updateMajorData({
            alphabet: data.alphabet,
            namespace: data.namespace,
            background: data.background,
            root: root1
        });
    }
}