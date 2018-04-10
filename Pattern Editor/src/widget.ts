import { Paper } from "snapsvg";
import { min, dummy } from "./utility/JSUtility";
import Snap = require("snapsvg");

export type HandlerGroup = {
    onDoubleClick: () => void;
    onClick: () => void;
    onDragStart: () => void;
    onDrop: (n: Node, ctrlPressed: boolean) => void;
}


function registerHandlers(paper: Paper, handlerGroup: HandlerGroup): void {
    let lastElement: HTMLElement | null = null;
    paper.drag(
        (dx, dy, x, y, e) => {
            const elem = Snap.getElementByPoint(e.clientX, e.clientY);
            lastElement = elem === null ? null : elem.node;
        },
        (x, y, e) => {
            handlerGroup.onDragStart();
            const elem = Snap.getElementByPoint(e.clientX, e.clientY);
            lastElement = elem === null ? null : elem.node;
        },
        (e) => {
            if (lastElement) {
                handlerGroup.onDrop(lastElement, e.ctrlKey);
            }
        }
    );
    paper.click(handlerGroup.onClick);
    // paper.dblclick(handlerGroup.onDoubleClick);
}


function registerHoverHandlers(paper: Paper, hg: { enter: () => void; leave: () => void; }) {
    paper.hover(hg.enter, hg.leave);
}


// function registerHover(paper: Paper, attr: { [key: string]: string }): void {
//     let oldAttr: { [key: string]: string };
//     paper.hover(
//         () => {
//             oldAttr = {};
//             for (const key of Object.keys(attr)) {
//                 console.log(key, paper.attr("stroke"));
//                 oldAttr[key] = paper.attr(key);
//             }
//             paper.attr(attr);
//         },
//         () => {
//             paper.attr(oldAttr);
//         }
//     );
// }


export function InternalBox(paper: Paper, pathString: string, x: number, y: number, radius: number, handlerGroup: HandlerGroup) {
    paper = paper.g();
    const c = paper.circle(x, y, radius).attr({
        "fill": "white",
        "stroke": "black",
        "smdl-path": pathString
    });
    c.hover(
        () => {
            c.animate({
                "r": (radius * 1.5).toString()
            }, 100);
        },
        () => {
            c.animate({
                "r": radius.toString()
            }, 100)
        }
    )
    registerHandlers(paper, handlerGroup);
}


export function SpacerBox(paper: Paper, label: string, pathString: string, width: number, height: number, handlerGroup: HandlerGroup) {
    paper = paper.g();
    const r = paper.rect(0, 0, width, height).attr({
        "stroke": "white",
        "fill": "white",
        "smdl-path": pathString
    });
    const p = paper.path(Snap.format("M0,0 V{h} M{w},0 V{h}", {
        "w": width,
        "h": height
    })).attr({
        "pointer-events": "none"
    });
    paper.text(width / 2, height / 2, label).attr({
        "stroke": "black",
        "fill": "black",
        "text-anchor": "middle",
        "dominant-baseline": "central",
        "pointer-events": "none",
        "font-size": height * 0.6
    });
    registerHandlers(paper, handlerGroup);
    r.hover(
        () => {
            p.attr({
                "stroke": "blue"
            });
        },
        () => {
            p.attr({
                "stroke": "black"
            })
        }
    )
}


export function PWMBox(paper: Paper, label: string, color: string, pathString: string, width: number, height: number, handlerGroup: HandlerGroup) {

    function bgdColorToLabelColor(color: string): string {
        const clr = Snap.color(color);
        const lightness = clr.l;
        return (lightness < 0.5) ? "white" : "black";
    }

    paper = paper.g();
    const r = paper.rect(0, 0, width, height, min(width / 3, height / 3)).attr({
        "stroke": "none",
        "fill": color,
        "smdl-path": pathString
    });
    const labelColor = bgdColorToLabelColor(color);
    paper.text(width / 2, height / 2, label).attr({
        "stroke": labelColor,
        "fill": labelColor,
        "text-anchor": "middle",
        "dominant-baseline": "central",
        "pointer-events": "none",
        "font-size": height * 0.6
    });
    registerHandlers(paper, handlerGroup);
    r.hover(
        () => {
            r.attr({
                "stroke": "blue"
            });
        },
        () => {
            r.attr({
                "stroke": "none"
            })
        }
    )
}