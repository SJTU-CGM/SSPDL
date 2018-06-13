import * as JSXFactory from "../JSX/SVGFactory";

import { Paper } from "snapsvg";
import { maxof, equal, zip, zip2, sum } from "../JSUtility";
import Snap = require("snapsvg");
import { PWMBox, InternalBox, SpacerBox, HandlerGroup } from "../widget";
import { UPath, ModuleEditCmd } from "./ModelEditor";
import { Controller, Editor } from "../Widget/Widget";

import { QuasiModule } from "../SSPDL/SSPDL";
import { Rider, Path } from "../SSPDL/Utility";


export type ColoredElement = ColoredMotif | ColoredGMotif | ColoredSpacer;


interface ColoredMotif {
    type: "motif";
    name: string;
    color: string;
}


interface ColoredGMotif {
    type: "g-motif";
    name: string;
    color: string;
}


interface ColoredSpacer {
    type: "spacer";
    name: string;
}


type ModelRider = Rider<ColoredElement>;


export class ModuleViewer extends Controller<QuasiModule<ColoredElement>, ModuleEditCmd>{
    svg: SVGElement;
    paper: Paper;
    init() {
        super.init();
        this.svg = <svg width="0" height="0" />;
        this.paper = Snap(this.svg);
        this.getDOM().innerHTML = ""
        this.getDOM().appendChild(this.svg);
    }
    displayData(data: QuasiModule<ColoredElement>): void {
        this.paper.clear();
        const go = renderModel(this.paper, data, {
            onDoubleClick: (path: UPath) => {
                // snap cannot distinguish click and double click

                // switch (path.kind) {
                //     case "element": {
                //         this.send({
                //             kind: "insp",
                //             path: path.path
                //         });
                //         return;
                //     }
                // }
            },
            onClick: (path: UPath) => {
                switch (path.kind) {
                    case "node": {
                        return this.send({
                            kind: "edit-node",
                            path: path.path,
                            index: path.index
                        });
                    }
                    case "element": {
                        return this.send({
                            kind: "edit-element",
                            path: path.path
                        });
                    }
                    case "alternation": {
                        this.send({
                            kind: "edit-alternation",
                            path: path.path
                        });
                        return;
                    }
                    case "repetition": {
                        this.send({
                            kind: "edit-repetition",
                            path: path.path
                        });
                        return;
                    }
                    default: {
                        return;
                    }
                }
            },
            onDragStart: (path: UPath) => { },
            onDrop: (path1: UPath, path2: UPath, ctrlPressed: boolean) => {
                if (path2 === null) {
                    return;
                } else if (path1.kind === "element" && path2.kind === "node") {
                    if (ctrlPressed) {
                        return this.send({
                            kind: "copy",
                            epath: path1.path,
                            mpath: path2.path,
                            mindex: path2.index
                        });
                    } else {
                        return this.send({
                            kind: "move",
                            epath: path1.path,
                            mpath: path2.path,
                            mindex: path2.index
                        });
                    }
                } else if (path1.kind === "node" && path2.kind === "node") {
                    if (equal(path1.path, path2.path) && path1.index !== path2.index) {
                        return this.send({
                            kind: "link",
                            mpath: path1.path,
                            p: path1.index,
                            q: path2.index
                        });
                    }
                } else {
                    return;
                }
            }
        });
        this.svg.setAttribute("width", go.w.toString());
        this.svg.setAttribute("height", (go.a + go.d).toString());
    }
}


interface HighLevelHandlerGroup {
    onDoubleClick: (path: UPath) => void;
    onClick: (path: UPath) => void;
    onDragStart: (path: UPath) => void;
    onDrop: (path1: UPath, path2: UPath, ctrlPressed: boolean) => void;
}


interface GObject {
    a: number; // vertical distance above baseline 
    d: number; // vertical distance below baseline
    w: number; // width
    node: Snap.Element;
}


function renderModel(paper: Paper, m: QuasiModule<ColoredElement>, hg: HighLevelHandlerGroup) {

    function profaneHandlerGroup(path: UPath): HandlerGroup {
        return {
            onDoubleClick: () => {
                hg.onDoubleClick(path);
            },
            onClick: () => {
                hg.onClick(path);
            },
            onDragStart: () => {
                hg.onDragStart(path);
            },
            onDrop: (node: Node, ctrlPressed: boolean) => {
                let attr;
                if (node instanceof SVGElement && (attr = node.getAttribute("smdl-path"))) {
                    const path1 = JSON.parse(attr);
                    hg.onDrop(path, path1, ctrlPressed);
                    return;
                } else {
                    // hg.onDrop(path, null, ctrlPressed);
                    return;
                }
            }
        }
    }

    function renderModule(paper: Paper, rider: ModelRider): GObject {
        paper.attr({
            "stroke": "black",
            "fill": "black"
        });
        const subs = rider.getChildRiders().map((rider) => {
            return renderModuleItem(paper.g(), rider);
        });
        const a = subs.length == 0 ? 30 : maxof(subs.map((s) => s.a));
        const d = subs.length == 0 ? 30 : maxof(subs.map((s) => s.d));

        const len = 60;
        let w = 0;
        let n = 0;
        const pushInternalElements = (w: number, pos: number): void => {
            paper.line(w, a, w + len, a);
            // little triangle
            paper.path(Snap.format("M{x},{y} l-10,-5 v10", {
                "x": w + len,
                "y": a
            })).attr({
                "fill": "black"
            });

            const path: UPath = {
                kind: "node",
                path: rider.getPath(),
                index: n
            }
            InternalBox(paper, JSON.stringify(path), w + len / 2, a, len / 8, profaneHandlerGroup(path));
        }
        pushInternalElements(w, 0);
        w += len;
        n++;
        for (const x of subs) {
            // childElements.push(transloc(x.node, w, a - x.a));
            x.node.transform(Snap.format("translate({x},{y})", {
                "x": w,
                "y": a - x.a
            }));
            w += x.w;
            pushInternalElements(w, n);
            w += len;
            n++;
        }
        return {
            a: a,
            d: d,
            w: w,
            node: paper
        };
    }

    function renderModuleItem(paper: Paper, rider: ModelRider): GObject {
        switch (rider.getItemKind()) {
            case "element": {
                return renderElement(paper, rider);
            }
            case "alternation": {
                return renderAlternation(paper, rider);
            }
            case "repetition": {
                return renderRepetition(paper, rider);
            }
            default: {
                throw new Error();
            }
        }
    }

    function renderElement(paper: Paper, rider: ModelRider): GObject {

        const renderMotif = (p: Path, name: string, color: string): GObject => {
            const totalWidth = 100;
            const totalHeight = 50;
            const elementWidgth = totalWidth;
            const elementHeight = 30;
            let [x, y, w, h] = [
                (totalWidth - elementWidgth) / 2,
                (totalHeight - elementHeight) / 2,
                elementWidgth,
                elementHeight
            ];
            const path: UPath = {
                kind: "element",
                path: rider.getPath()
            };
            PWMBox(
                paper, name, color, JSON.stringify(path),
                x, y, w, h,
                profaneHandlerGroup(path)
            );
            return {
                a: totalHeight / 2,
                d: totalHeight / 2,
                w: totalWidth,
                node: paper
            };
        }

        const renderGMotif = (p: Path, name: string, color: string): GObject => {
            const totalWidth = 100;
            const totalHeight = 50;
            const elementWidth = totalWidth;
            const elementHeight = 30;
            let [x, y, w, h] = [
                (totalWidth - elementWidth) / 2,
                (totalHeight - elementHeight) / 2,
                elementWidth,
                elementHeight
            ];
            const path: UPath = {
                kind: "element",
                path: rider.getPath()
            };
            PWMBox(
                paper, name, color, JSON.stringify(path),
                x, y, w, h,
                profaneHandlerGroup(path)
            );
            return {
                a: totalHeight / 2,
                d: totalHeight / 2,
                w: totalWidth,
                node: paper
            };
            // const w = 100;
            // const h = 60;
            // const path: UPath = {
            //     kind: "element",
            //     path: rider.getPath()
            // };
            // PWMBox(paper, name, color, JSON.stringify(path), 0, 15, w, 30, profaneHandlerGroup(path));
            // // PWMBox(paper, name, color, JSON.stringify(path), w, h, profaneHandlerGroup(path));
            // return {
            //     a: h / 2,
            //     d: h / 2,
            //     w: w,
            //     node: paper
            // };
        }

        const renderSpacer = (p: Path, name: string): GObject => {
            const totalWidth = 60;
            const totalHeight = 30;
            const elementWidth = 60;
            const elementHeight = 20;
            let [x, y, w, h] = [
                (totalWidth - elementWidth) / 2,
                (totalHeight - elementHeight) / 2,
                elementWidth,
                elementHeight
            ];
            const path: UPath = {
                kind: "element",
                path: rider.getPath()
            };
            SpacerBox(paper, name, JSON.stringify(path), x, y, w, h, profaneHandlerGroup(path));
            return {
                a: totalHeight / 2,
                d: totalHeight / 2,
                w: totalWidth,
                node: paper
            };
        }

        const elem = rider.getElementContent();
        switch (elem.type) {
            case "motif": {
                return renderMotif(rider.getPath(), elem.name, elem.color);
            }
            case "g-motif": {
                return renderGMotif(rider.getPath(), elem.name, elem.color);
            }
            case "spacer": {
                return renderSpacer(rider.getPath(), elem.name);
            }
        }
    }

    function renderAlternation(paper: Paper, rider: ModelRider): GObject {
        const leftPadding = 20;
        const rightPadding = 10;
        const topPadding = 5;
        const botPadding = 5;
        const interModulePadding = 5;
        const probLabelOffsetY = -3;
        const probLabelOffsetX = 3;

        const alter = rider.getAlternation();
        const subGOs: GObject[] = rider.getChildRiders().map((m) => renderModule(paper.g(), m));
        const subWidth = maxof(subGOs.map((go) => {
            return go.w;
        }));
        const subLayoutParas: { x0: number; x1: number; y: number; z: number, prob: number; elem: Snap.Element }[] = [];
        let offsetY = topPadding;
        for (const [go, ps] of zip2(subGOs, alter.psubs)) {
            subLayoutParas.push({
                x0: leftPadding + (subWidth - go.w) / 2,
                x1: leftPadding + (subWidth + go.w) / 2,
                y: offsetY,
                z: offsetY + go.a,
                prob: ps.prob,
                elem: go.node
            });
            offsetY += go.a + go.d + interModulePadding;
        }
        const totalHeight = offsetY - interModulePadding + botPadding;
        const totalWidth = leftPadding + subWidth + rightPadding;
        const leftEnd = 0;
        const rightEnd = leftPadding + subWidth + rightPadding;
        for (const para of subLayoutParas) {
            // translate position
            paper.add(para.elem.transform(Snap.format("translate({x},{y})", {
                "x": para.x0,
                "y": para.y
            })));
            // left/right extension
            paper.line(leftEnd, para.z, para.x0, para.z);
            paper.line(para.x1, para.z, rightEnd, para.z);
        }
        // probability labels
        const pp = paper.g();
        const probs = subLayoutParas.map((para) => {
            return para.prob;
        });
        for (const para of subLayoutParas) {
            pp.text(leftEnd + probLabelOffsetX, para.z + probLabelOffsetY, para.prob.toFixed(2))
        }
        const jointTop = subGOs[0].a + topPadding;
        const jointBot = totalHeight - subGOs[subGOs.length - 1].d - botPadding;
        pp.line(leftEnd, jointTop, leftEnd, jointBot);
        pp.line(rightEnd, jointTop, rightEnd, jointBot);
        pp.hover(
            () => {
                pp.attr({
                    "stroke": "blue",
                    "fill": "blue"
                });
            },
            () => {
                pp.attr({
                    "stroke": "black",
                    "fill": "black"
                });
            })
        pp.click(() => {
            hg.onClick({
                kind: "alternation",
                path: rider.getPath()
            });
        });
        const jointMid = (jointTop + jointBot) / 2
        return {
            a: jointMid,
            d: totalHeight - jointMid,
            w: totalWidth,
            node: paper
        };
    }

    function renderRepetition(paper: Paper, rider: ModelRider): GObject {
        const arrowHeight = 20;
        const horizontalPadding = 5;
        const probLabelOffsetX = 3

        const rep = rider.getRepetition();
        const x = renderModule(paper.g(), rider.getChildRiders()[0]);
        x.node.transform(Snap.format("translate({x},{y})", {
            "x": horizontalPadding,
            "y": arrowHeight
        }));
        const pp = paper.g();
        // reverse arrow
        pp.path(Snap.format("M{x},{y} v-{h} h{w} v{h}", {
            "x": horizontalPadding / 2,
            "y": x.a + arrowHeight,
            "h": x.a + arrowHeight / 2,
            "w": x.w + horizontalPadding
        })).attr({
            "fill": "none"
        });
        // triangle
        pp.path(Snap.format("M{x},{y} l-5,-10 h10", {
            "x": horizontalPadding / 2,
            "y": x.a + arrowHeight - horizontalPadding / 2
        }));
        // dots
        const dotRadius = horizontalPadding / 2;
        pp.circle(dotRadius, x.a + arrowHeight, dotRadius);
        pp.circle(x.w + dotRadius * 3, x.a + arrowHeight, dotRadius);
        // probability label
        const labelX = x.w + dotRadius * 3 + probLabelOffsetX;
        const labelY = (x.a + arrowHeight) - (x.a + arrowHeight / 2) / 2;
        pp.text(labelX, labelY, rep.prob.toFixed(2)).attr({
            "dominant-baseline": "central"
        });
        pp.hover(
            () => {
                pp.attr({
                    "stroke": "blue",
                    "fill": "blue"
                });
            },
            () => {
                pp.attr({
                    "stroke": "black",
                    "fill": "black"
                });
            }
        )
        pp.click(
            () => {
                hg.onClick({
                    kind: "repetition",
                    path: rider.getPath()
                })
            }
        )
        return {
            a: x.a + arrowHeight,
            d: x.d,
            w: x.w + 2 * horizontalPadding,
            node: paper
        }
    }

    return renderModule(paper, new Rider(m));
}


