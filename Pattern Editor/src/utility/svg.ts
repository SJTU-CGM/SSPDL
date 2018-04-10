export namespace SVG {
    interface SVGAttrSpec {
        [key: string]: string | number;
    }
    export const namespace = "http://www.w3.org/2000/svg";
    export function elem(tag: string, as: SVGAttrSpec = {}): SVGElement {
        const e = document.createElementNS(namespace, tag) as SVGElement;
        attr(e, as);
        return e;
    }
    export function attr(e: SVGElement, as: SVGAttrSpec): void {
        for (const key of Object.keys(as)) {
            e.setAttributeNS("", key, as[key] + "");
        }
        return;
    }
    export function svg(attr: SVGAttrSpec = {}): SVGSVGElement {
        return elem("svg", attr) as SVGSVGElement;
    }
    type BuildNode = BuildElement | BuildCompound;
    type BuildElement = SVGElement | string | number | {
        tag: string;
        attr?: SVGAttrSpec;
    }
    interface BuildCompound {
        p: BuildElement;
        ch: BuildNode[];
    }
    export function build(n: BuildNode): SVGElement {
        if (n instanceof SVGElement) {
            return n;
        } else if (typeof n === "string" || typeof n === "number") {
            const e = elem("tspan");
            e.appendChild(document.createTextNode(n + ""));
            return e;
        } else if ("tag" in n) {
            return elem(n.tag, n.attr || {});
        } else if ("p" in n) {
            const p = build(n.p);
            p.innerHTML = "";
            for (const c of n.ch) {
                p.appendChild(build(c));
            }
            return p;
        } else {
            // n is never;
            console.log(n);
            throw new Error(n);
        }
    }
}