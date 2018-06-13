interface SVGCommonAttributes {
    class?: string[];
    style?: { [key: string]: string };
    transform?: string;
    fill?: string;
    stroke?: string;
}
interface SVGSVGAttribute {
    width: SVGLength;
    height: SVGLength;
}
type SVGLength = number | string;
export namespace JSX {
    export interface IntrinsicElements {
        svg: SVGCommonAttributes & SVGSVGAttribute;
        rect: SVGCommonAttributes & {
            x: SVGLength;
            y: SVGLength;
            width: SVGLength;
            height: SVGLength;
        }
        g: SVGCommonAttributes;
        text: SVGCommonAttributes & {
            x: SVGLength;
            y: SVGLength;
        };
        line: SVGCommonAttributes & {
            x1: SVGLength;
            y1: SVGLength;
            x2: SVGLength;
            y2: SVGLength;
        }
    }
    export type Element = SVGElement;
}
export function createElement<T>(tag: string, attr: any, ...children: JSX.Element[]): Element {
    const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attr) {
        for (const k of Object.keys(attr)) {
            if (k === "class") {
                for (const cls of attr.class) {
                    e.classList.add(cls);
                }
            } else if (k === "style") {
                const styleList = Object.keys(attr.style).map((k) => ({
                    name: k,
                    value: attr.style[k]
                }));
                const styleString = styleList.map((x) => (x.name + ":" + x.value + ";")).join("");
                e.setAttribute("style", styleString);
            } else {
                e.setAttribute(k, attr[k])
            }
        }
    }
    if (children) {
        for (const ch of children) {
            if (typeof ch === "string" || typeof ch === "number") {
                e.appendChild(document.createTextNode(ch + ""));
            } else if (ch instanceof SVGElement){
                e.appendChild(ch);
            } else {
                console.log("???", ch)
            }
        }
    }
    return e;
}
export function render(container: SVGElement, ...children: SVGElement[]): void {
    container.innerHTML = "";
    for (const ch of children) {
        container.appendChild(ch)
    }
}
export type Builder<Prop> = (prop: Prop) => SVGElement;