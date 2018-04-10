import { later } from "../utility/JSUtility";

export {
    Widget, Frame, Viewer, Editor, Controller, Controllee, classof, Controller_, $Controller
}


abstract class Widget {
    protected dom: HTMLElement;
    constructor(root?: HTMLElement) {
        this.dom = root || document.createElement("div");
        this.init();
    }
    protected init(): void {
        // for those who want to initialize without overriding constructor procedure
    }
    public getDOM(): HTMLElement {
        return this.dom;
    }
}


abstract class Frame extends Widget {
    protected children: Widget[] = [];
    abstract position(container: HTMLElement, children: Widget[]): void;
    setChildren(children: Widget[]): void {
        this.children = children;
        this.position(this.getDOM(), children);
    }
    getChildren(): Widget[] {
        return this.children.slice(0, this.children.length);
    }
}


abstract class Viewer<D> extends Widget {
    protected dataSetted: boolean = false;
    protected data: D;
    public setData(data: D): void {
        this.dataSetted = true;
        this.data = data;
        this.displayData(this.dom, this.data);
    }
    public getData(): D {
        if (this.dataSetted) {
            return JSON.parse(JSON.stringify(this.data));
        } else {
            throw new Error("tried getting data before initialization");
        }
    }
    abstract displayData(container: HTMLElement, data: D): void;
}


abstract class Editor<D> extends Viewer<D> {
    protected dataChangeHandlers: Set<(data: D) => void> = new Set();
    public registerHandler(handler: (data: D) => void) {
        this.dataChangeHandlers.add(handler);
    }
    public cancelHandler(handler: (data: D) => void) {
        this.dataChangeHandlers.delete(handler);
    }
    public setData(data: D): void {
        super.setData(data);
        this.emitDataChange();
    }
    protected emitDataChange(): void {
        const data = this.getData();
        for (const handler of this.dataChangeHandlers) {
            handler(data);
        }
    }
}


interface Controllee<Command> {
    handle(cmd: Command): void;
}


abstract class Controller<D, Command> extends Viewer<D> implements Controller_<Command> {
    private eeSet = new Set<Controllee<Command>>();
    bind(ee: Controllee<Command>): void {
        this.eeSet.add(ee);
    }
    send(cmd: Command) {
        for (const ee of this.eeSet) {
            ee.handle(cmd);
        }
    }
}


interface Controller_<Command> {
    bind(ee: Controllee<Command>): void;
    send(cmd: Command): void;
}


type classof<C> = new (...x: any[]) => C;
// function $Controller<BaseClass extends Widget, Command>(W: classof<BaseClass>): classof<BaseClass & Controller_<Command>> {
function $Controller<BCConstructor extends classof<Widget>, Command>(bcc: BCConstructor) {
    return class extends bcc implements Controller_<Command> {
        private eeSet = new Set<Controllee<Command>>();
        public bind(ee: Controllee<Command>): void {
            this.eeSet.add(ee);
        }
        public send(cmd: Command): void {
            for (const ee of this.eeSet) {
                ee.handle(cmd);
            }
        }
    };
} 