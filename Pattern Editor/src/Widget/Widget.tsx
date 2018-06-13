import * as JSXFactory from "../JSX/HTMLFactory";


export {
    Widget, Frame, Viewer, Editor, Controller, Controllee
}


abstract class Widget {
    private dom: HTMLElement;
    constructor() {
        this.dom = this.makeContainer();
        this.init();
    }
    protected makeContainer(): HTMLElement {
        return <div />
    }
    protected init(): void {
        // for those who want to initialize without overriding constructor procedure
    }
    public getDOM(): HTMLElement {
        return this.dom;
    }
}


abstract class Frame extends Widget {
    private children: Widget[] = [];
    protected abstract position(container: HTMLElement, children: Widget[]): void;
    public setChildren(children: Widget[]): void {
        this.children = children;
        this.position(this.getDOM(), children);
    }
    public getChildren(): Widget[] {
        return this.children.slice(0, this.children.length);
    }
}


abstract class Viewer<D> extends Widget {
    private dataSetted: boolean = false;
    private data: D;
    public initData(data: D): void {
        this.dataSetted = true;
        this.data = data;
        this.display()
    }
    public getData(): D {
        if (this.dataSetted) {
            return this.data;
        } else {
            throw new Error("tried getting data before initialization");
        }
    }
    private display(): void {
        this.displayData(this.getData());
    }
    protected abstract displayData(data: D): void;
}


abstract class Editor<MajorData, MinorData> extends Widget {
    /*
     * Major Data: data editable by user input
     * Minor Data: not editable
     */
    private dataChangeHandlers: Set<(data: MajorData, changeSource: any) => void> = new Set();
    public register(listener: any, handler: (data: MajorData) => void) {
        this.dataChangeHandlers.add((data, source)=>{
            if (source !== listener) {
                handler(data)
            }
        });
    }
    public cancel(handler: (data: MajorData) => void) {
        this.dataChangeHandlers.delete(handler);
    }
    protected emitDataChange(changeSource?: any): void {
        const data = this.getMajorData();
        changeSource = changeSource || this;
        for (const handler of this.dataChangeHandlers) {
            handler(data, changeSource);
        }
    }
    private majorDataSetted: boolean = false;
    private majorData: MajorData;
    private minorDataSetted: boolean = false;
    private minorData: MinorData;
    public initData(data: MajorData, extra: MinorData): void {
        this.majorDataSetted = true;
        this.majorData = data;
        this.minorData = extra
        this.minorDataSetted = true;
        this.display()
    }
    public updateMajorData(data: MajorData, source?: any): void {
        if (!this.majorDataSetted) {
            debugger
            throw new Error("update data before initialization")
        } else {
            this.majorData = data;
            this.display()
            this.emitDataChange(source || this)
        }
    }
    public updateMinorData(extra: MinorData): void {
        if (!this.minorDataSetted) {
            debugger
            throw new Error("update data before initialization")
        } else {
            this.minorData = extra
            this.display()
        }
    }
    public getMajorData(): MajorData {
        if (this.majorDataSetted) {
            return this.majorData;
        } else {
            throw new Error("tried getting data before initialization");
        }
    }
    public getMinorData(): MinorData {
        if (this.minorDataSetted) {
            return this.minorData;
        } else {
            throw new Error("tried getting extra data before initialization");
        }
    }
    protected display(): void {
        this.displayData(this.majorData, this.minorData)
    }
    protected abstract displayData(data: MajorData, extra: MinorData): void;
}


abstract class Controller<D, Command> extends Viewer<D> {
    private eeSet = new Set<Controllee<Command>>();
    public bind(ee: Controllee<Command>): void {
        this.eeSet.add(ee);
    }
    protected send(cmd: Command) {
        for (const ee of this.eeSet) {
            ee.handle(cmd);
        }
    }
}


interface Controllee<Cmd> {
    handle(cmd: Cmd): void;
}