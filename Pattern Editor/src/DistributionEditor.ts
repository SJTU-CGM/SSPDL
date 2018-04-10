import { Editor, Controllee, Viewer, Controller_, Controller } from "./Widget/Widget";
import { Distribution } from "./SMDL/SMDL";
import { HTML } from "./html";
import { StringEditor } from "./Widget/StringEditor";
import { StringViewer } from "./Widget/StringViewer";
import { Button, ButtonCmd } from "./Widget/Button";
import { HPile } from "./Widget/Pile";
import Snap = require("snapsvg");
import { later, format, sum } from "./utility/JSUtility";
import { SVG } from "./utility/svg";
import { popup, confirm } from "./Widget/Utility";


export class DistributionEditor extends Editor<Distribution> {
    private viewer: DViewer;
    private editor: DEditor;
    init(): void {
        this.viewer = new DViewer();
        this.editor = new DEditor();
        HTML.b({
            p: this.getDOM(),
            ch: [
                "Distribution:",
                this.viewer.getDOM()
            ]
        });
        this.viewer.bind({
            handle: (cmd)=>{
                confirm(this.editor, {
                    ok: () => {
                        const newData = this.editor.getData();
                        if (newData.probs.every((n)=>{ return 0 <= n && n <= 1; }) && sum(...newData.probs) === 1) {
                            this.viewer.setData(this.editor.getData());
                        } else {
                            alert("invalid distribution: either some probability is out of [0,1] or their sum does not equal to 1.");
                        }
                    },
                    cancel: ()=>{
                    }
                });
            }
        })
    }
    getData(): Distribution {
        return this.viewer.getData();
    }
    displayData(container: HTMLElement, data: Distribution): void {
        this.viewer.setData(data);
        this.editor.setData(data);
    }
}


class DViewer extends Controller<Distribution, "click"> {
    private svg: SVGElement;
    private paper: Snap.Paper;
    init(): void {
        super.init();
        this.svg = SVG.svg({
            "stroke": "black",
            "fill": "white"
        });
        this.paper = Snap(this.svg);
        HTML.inner(this.getDOM(), [this.svg]);

        this.svg.addEventListener("click", ()=>{
            this.send("click");
        })
    }
    displayData(container: HTMLElement, data: Distribution): void {
        const contentHeight = 100;
        const unitWidth = 30;
        const topPadding = 20;
        const bottomPadding = 20;
        const leftPadding = 10;
        const rightPadding = 10;
        const height = contentHeight + topPadding + bottomPadding;

        const heightProbRatio = contentHeight / Math.max(0, ...data.probs);
        const width = leftPadding + unitWidth * data.probs.length + rightPadding;

        SVG.attr(this.svg, {
            "width": width,
            "height": height
        });
        SVG.build({
            p: this.svg,
            ch: [
                ... data.probs.map((p, i)=>{
                    const index = data.from + i;
                    const h = p * heightProbRatio;
                    const w = unitWidth;
                    const top = topPadding + contentHeight;
                    const left = leftPadding + unitWidth * i;
                    return SVG.build({
                        p: {
                            tag: "g",
                            attr: {
                                "transform": format("translate(%,%)", left, top)
                            }
                        },
                        ch: [
                            {
                                tag: "rect",
                                attr: {
                                    "x": 0, "y": -h, "width": w, "height": h,
                                    "fill": "lightblue",
                                    "stroke": "white"
                                }
                            },
                            {
                                p: {
                                    tag: "text",
                                    attr: {
                                        "x": unitWidth / 2, "y": -h,
                                        "fill": "black",
                                        "stroke": "black",
                                        "dominant-baseline": "baseline",
                                        "text-anchor": "middle",
                                        "pointer-events": "none",
                                        "font-size": "0.8em"
                                    }
                                },
                                ch: [ p.toFixed(3) ]
                            },
                            {
                                p: {
                                    tag: "text",
                                    attr: {
                                        "x": unitWidth / 2, "y": 0,
                                        "fill": "black",
                                        "stroke": "black",
                                        "dominant-baseline": "hanging",
                                        "text-anchor": "middle",
                                        "pointer-events": "none"
                                    }
                                },
                                ch: [ index ]
                            }
                        ]
                    });
                }),
                {
                    tag: "line",
                    attr: {
                        "x1": 0, "y1": topPadding + contentHeight, "x2": width, "y2": topPadding + contentHeight,
                        "stroke": "black",
                        "fill": "black"
                    }
                }
            ]
        })
    }
}


class DEditor extends Editor<Distribution> {
    private fromInput: HTMLInputElement;
    private probsEr: ProbsEditor;
    init(): void {
        super.init();
        this.fromInput = HTML.e({
            tag: "input",
            attr: {
                "type": "number",
                "step": "1",
                "min": "0"
            }
        }) as HTMLInputElement;
        this.fromInput.addEventListener("change", ()=>{
            this.probsEr.setData(Object.assign({}, this.probsEr.getData(), {
                "from": parseInt(this.fromInput.value)
            }));
        })
        this.probsEr = new ProbsEditor();
        HTML.b({
            p: this.getDOM(),
            ch: [
                {
                    p: {
                        tag: "label"
                    },
                    ch: [
                        "From",
                        this.fromInput
                    ]
                },
                this.probsEr.getDOM()
            ]
        });
    }
    getData(): Distribution {
        return this.probsEr.getData();
    }
    displayData(container: HTMLElement, data: Distribution): void {
        this.fromInput.value = data.from + "";
        this.probsEr.setData(data);
    }
}


class ProbsEditor extends Editor<Distribution> implements Controllee<ButtonCmd> {
    handle(cmd: ButtonCmd): void {
        switch (cmd.message) {
            case "add-row": {
                const data = this.getData()
                this.setData({
                    from: data.from,
                    probs: [...data.probs, 0]
                });
                return;
            }
            case "del-row": {
                const data = this.getData()
                this.setData({
                    from: data.from,
                    probs: (data.probs.length > 0) ? data.probs.slice(0, data.probs.length - 1) : []
                });
                return;
            }
        }
    }
    private editors: StringEditor[];
    private addRowButton: Button;
    private delRowButton: Button;
    init(): void {
        super.init();
        this.addRowButton = new Button();
        this.addRowButton.setData({
            label: "+",
            message: "add-row"
        });
        this.addRowButton.bind(this);
        this.delRowButton = new Button();
        this.delRowButton.setData({
            label: "-",
            message: "del-row"
        });
        this.delRowButton.bind(this);
    }
    getData(): Distribution {
        return {
            from: this.data.from,
            probs: this.editors.map((e)=>{ return parseFloat(e.getData()); })
        };
    }
    displayData(container: HTMLElement, data: Distribution): void {
        const len = data.probs.length;
        this.editors = [];
        for (let i = 0; i < len; i++) {
            this.editors.push(new StringEditor());
        }
        for (let i = 0; i < len; i++) {
            this.editors[i].setData({
                label: (data.from + i).toString(),
                content: data.probs[i].toFixed(3)
            });
        }
        const pile = new HPile();
        pile.setChildren([this.addRowButton, this.delRowButton]);
        HTML.b({
            p: container,
            ch: [...this.editors.map(e => e.getDOM()), pile.getDOM()]
        })
    }
}