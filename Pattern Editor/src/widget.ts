import { Paper } from "snapsvg";
import { min, dummy } from "./JSUtility";
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


export function SpacerBox(paper: Paper, label: string, pathString: string, x: number, y: number, width: number, height: number, handlerGroup: HandlerGroup) {
    paper = paper.g();
    const r = paper.rect(x, y, width, height).attr({
        "stroke": "white",
        "fill": "white",
        "smdl-path": pathString
    });
    const p = paper.path(Snap.format("M{x1},{y} V{h} M{x2},{y} V{h}", {
        "x1": x,
        "x2": x + width,
        "y": y,
        "h": y + height
    })).attr({
        "pointer-events": "none"
    });
    paper.text(x + width / 2, y + height / 2, label).attr({
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


export function PWMBox(paper: Paper, label: string, fillColor: string, pathString: string, x: number, y: number, width: number, height: number, handlerGroup: HandlerGroup) {

    function fillToStroke(color: string): string {
        const clr = Snap.color(color);
        const lightness = clr.l;
        return (lightness < 0.5) ? "white" : "black";
    }

    paper = paper.g()
    paper.transform(Snap.format("translate({x},{y})", {
        "x": x,
        "y": y
    }));
    const strokeColor = fillToStroke(fillColor);
    const r = paper.rect(0, 0, width, height, min(width / 3, height / 3)).attr({
        "stroke": strokeColor,
        "fill": fillColor,
        "smdl-path": pathString
    });
    paper.text(width / 2, height / 2, label).attr({
        "stroke": strokeColor,
        "fill": strokeColor,
        "text-anchor": "middle",
        "dominant-baseline": "central",
        "pointer-events": "none",
        "font-size": height * 0.5 + "px"
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
                "stroke": strokeColor
            })
        }
    )
}