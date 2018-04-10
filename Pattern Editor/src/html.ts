import { format } from "./utility/JSUtility";
import { SVG } from "./utility/svg";

interface ElementAttr {
    [key: string]: string;
}


type BuildBlock = string | Node | {
    p: HTMLElement,
    ch: BuildBlock[]
};


type StyleSpec = { [key: string]: string };


function buildChild(block: BuildBlock): Node {
    if (block instanceof Node) {
        return block;
    } else if (typeof block == "string") {
        return HTML.text(block);
    } else {
        const pEl = block.p;
        for (const c of block.ch) {
            pEl.appendChild(buildChild(c));
        }
        return pEl;
    }
}


type BBlock = string | Node | ESpec | {
    p: HTMLElement | ESpec,
    ch: BBlock[]
};

type ESpec = { tag: string, style?: StyleSpec, attr?: ElementAttr, ch?: BBlock[] };

export class HTML {
    static body(): HTMLElement {
        return document.getElementsByTagName("body")[0];
    }
    static svg(): SVGSVGElement {
        return SVG.svg();
    }
    static e(s: ESpec): HTMLElement {
        const tag = s.tag;
        const attr = s.attr || {};
        const style = s.style || {};
        const ch = s.ch || [];
        const elem = document.createElement(tag);for (const key in attr) {
            elem.setAttribute(key, attr[key]);
        }
        elem.setAttribute("style", HTML.style(style) + (elem.getAttribute("style") || ""));
        elem.innerHTML = "";
        for (const c of ch) {
            elem.appendChild(HTML.b(c));
        }
        return elem;
    }
    static b(bb: BBlock): HTMLElement {
        function bChild(bb: BBlock): Node {
            if (bb instanceof Node) {
                return bb;
            } else if (typeof bb == "string") {
                return HTML.text(bb);
            } else if ("tag" in bb) {
                return HTML.e(bb);
            } else if ("p" in bb) {
                const p = bb.p;
                const pEl = (p instanceof HTMLElement) ? p : HTML.e(p);
                pEl.innerHTML = "";
                for (const c of bb.ch) {
                    pEl.appendChild(bChild(c));
                }
                return pEl;
            } else {
                throw new Error();
            }
        }
        if (typeof bb == "string") {
            const spanEl = HTML.element("span");
            spanEl.appendChild(HTML.text(bb));
            return spanEl;
        } else if (bb instanceof HTMLElement) {
            return bb;
        } else if (bb instanceof Node) {
            const divEl = HTML.element("div");
            divEl.appendChild(bb);
            return divEl;
        } else if ("tag" in bb) {
            return HTML.e(bb);
        } else if ("p" in bb) {
            const p = bb.p;
            const pEl = (p instanceof HTMLElement) ? p : HTML.e(p);
            pEl.innerHTML = "";
            for (const c of bb.ch) {
                pEl.appendChild(bChild(c));
            }
            return pEl;
        } else {
            throw new Error();
        }
    }
    static box(): HTMLElement {
        return HTML.element("div");
    }
    static ref(id: string): HTMLElement {
        const e = document.getElementById(id);
        if (e === null) {
            throw new Error(id + " is not defined");
        } else {
            return e;
        }
    }
    static style(s: StyleSpec): string {
        return Object.keys(s).map((k) => format("%: %", k, s[k])).join("; ") + "; ";
    }
    static element(tag: string, attr: ElementAttr = {}, style: StyleSpec = {}, children: BuildBlock[] = []): HTMLElement {
        const e = document.createElement(tag);
        for (const key in attr) {
            e.setAttribute(key, attr[key]);
        }
        e.setAttribute("style", HTML.style(style) + (e.getAttribute("style") || ""));
        e.innerHTML = "";
        for (const c of children) {
            e.appendChild(buildChild(c));
        }
        return e;
    }
    static inner(parent: HTMLElement, children: BuildBlock[]): void {
        HTML.build({
            p: parent,
            ch: children
        });
    }
    static build(block: BuildBlock): HTMLElement {
        if (typeof block == "string") {
            const spanEl = HTML.element("span");
            spanEl.appendChild(HTML.text(block));
            return spanEl;
        } else if (block instanceof HTMLElement) {
            return block;
        } else if (block instanceof Node) {
            const divEl = HTML.element("div");
            divEl.appendChild(block);
            return divEl;
        } else {
            const pEl = block.p;
            pEl.innerHTML = "";
            for (const c of block.ch) {
                pEl.appendChild(buildChild(c));
            }
            return pEl;
        }
    }
    static text(content: string): Node {
        return document.createTextNode(content);
    }
    static span(content: string, style: StyleSpec = {}): HTMLSpanElement {
        return HTML.e({
            tag: "span",
            style: style,
            ch: [ content ]
        });
    }
    static group(x: UNodeList): HTMLElement {
        // TODO
        return HTML.element("div");
    }
}


type UNodeElement = Node | string;
interface UNodeList_ {
    [key: number]: UNodeElement | (UNodeList_ & Array<any>);
};
type UNodeList = UNodeList_ & Array<any>;
type UNode = UNodeElement | UNodeList;