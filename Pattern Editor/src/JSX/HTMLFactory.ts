export namespace JSX {
    export type Attribute = {
        id?: string;
        class?: string[];
        style?: {
            "display"?: "flex" | "unset" | "none" | "block" | "inline";
            "flex-direction"?: "column" | "row";
            "flex-grow"?: number | string;
            "justify-content"?: "flex-end" | "center";
            "cursor"?: "pointer";
            "position"?: "relative" | "absolute" | "fixed" ;
            "padding-left"?: string;
            "padding-right"?: string;
            "padding-top"?: string;
            "padding-bottom"?: string;
            "margin-left"?: string;
            "margin-right"?: string;
            "margin-top"?: string;
            "margin-bottom"?: string;
            "width"?: string;
            "height"?: string;
            "background-color"?: string;
            "color"?: string;
            "border-bottom"?: string;
        } & { [key: string]: string };
    };
    interface TextareaAttribute {
        rows: string;
        cols: string;
    }
    type InputAttribute = ColorInputAttribute | TextInputAttribute | NumberInputAttribute;
    interface ColorInputAttribute {
        type: "color";
    }
    interface TextInputAttribute {
        type: "text";
    }
    interface NumberInputAttribute {
        type: "number";
        step: string | number;
        min?: string | number;
        max?: string | number;
    }
    interface TdAttribute {
        colspan?: string | number;
    }
    export interface IntrinsicElements {
        // user interface
        div: Attribute;
        button: Attribute;
        input: InputAttribute & Attribute;
        textarea: TextareaAttribute & Attribute;
        label: Attribute;
        // documentory
        h1: Attribute;
        h2: Attribute;
        h3: Attribute;
        h4: Attribute;
        p: Attribute;
        article: Attribute;
        span: Attribute;
        strong: Attribute;
        em: Attribute;
        table: Attribute;
        tr: Attribute;
        th: Attribute;
        td: Attribute & TdAttribute;
    }
    export type Element = HTMLElement;
    export interface ClassElement {
        render(): HTMLElement;
    }
}
export function render(container: HTMLElement, ...children: HTMLElement[]): void {
    container.innerHTML = "";
    for (const ch of children) {
        container.appendChild(ch)
    }
}
export type Builder<Prop> = (prop: Prop) => HTMLElement;
export function createElement(tag: string | Function, attr: JSX.Attribute, ...children: (JSX.Element | JSX.Element[])[]): Element {
    if (typeof tag === "function") {
        const builder = tag;
        const prop = attr;
        return builder(attr);
    } else {
        const e = document.createElement(tag);
        if (attr) {
            for (const key of Object.keys(attr)) {
                if (key === "id") {
                    e.id = attr.id as string;
                } else if (key === "class") {
                    for (const cls of (attr.class as string[])) {
                        e.classList.add(cls);
                    }
                } else if (key === "style") {
                    const st = attr.style as { [key: string]: string };
                    const styleList = Object.keys(st).map((k) => ({
                        name: k,
                        value: st[k] as string
                    }));
                    const styleString = styleList.map((x) => (x.name + ":" + x.value + ";")).join("");
                    e.setAttribute("style", styleString);
                } else {
                    const a = attr as { [key: string]: string };
                    e.setAttribute(key, a[key] as string);
                }
            }
            if (attr.style) {
                const st = attr.style;
                const styleList = Object.keys(st).map((k) => ({
                    name: k,
                    value: st[k] as string
                }));
                const styleString = styleList.map((x) => (x.name + ":" + x.value + ";")).join("");
                e.setAttribute("style", styleString);
            }
        }
        if (children) {
            for (const ch of children) {
                if (typeof ch === "string" || typeof ch === 'number') {
                    e.appendChild(document.createTextNode(ch));
                } else if (ch instanceof Array) {
                    for (const c of ch) {
                        e.appendChild(c);
                    }
                } else if (ch instanceof Node) {
                    e.appendChild(ch);
                } else {
                    console.error("what's this?", ch)
                    throw new Error()
                }
            }
        }
        return e;
    }
}
