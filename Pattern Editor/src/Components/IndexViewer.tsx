import * as JSXFactory from "../JSX/HTMLFactory";
import { ElementKind } from "../SSPDL/SSPDL";
import { Controller } from "../Widget/Widget";
import { Box } from "../SVGComponents/Box";


export type IndexItem = MotifIndexItem | SpacerIndexItem;


interface MotifIndexItem {
    name: string;
    kind: ElementKind.Motif | ElementKind.GMotif;
    color: string;
    useCount: number;
}
interface SpacerIndexItem {
    name: string;
    kind: ElementKind.Spacer;
    useCount: number;
}


export type Index = IndexItem[];
export type IndexCmd = FocusCmd | NewElementCmd;
interface FocusCmd {
    kind: "focus"
    name: string;
}
interface NewElementCmd {
    kind: "new-element"
    elementKind: ElementKind
}
export class IndexViewer extends Controller<Index, IndexCmd> {
    protected makeContainer() {
        return (
            <div
                style={{
                    "flex-grow": "0",
                    "width": "10em",
                    "display": "flex",
                    "flex-direction": "column",
                    "flex-shrink": "0"
                }}
            ></div>
        )
    }
    private itemContainer: HTMLElement
    protected init() {
        const motifButton = <button>New Motif</button>
        const gmotifButton = <button>New G-Motif</button>
        const spacerButton = <button>New Spacer</button>
        motifButton.addEventListener("click", ()=>{
            this.send({
                kind: "new-element",
                elementKind: ElementKind.Motif
            })
        })
        gmotifButton.addEventListener("click", ()=>{
            this.send({
                kind: "new-element",
                elementKind: ElementKind.GMotif
            })
        })
        spacerButton.addEventListener("click", ()=>{
            this.send({
                kind: "new-element",
                elementKind: ElementKind.Spacer
            })
        })
        JSXFactory.render(this.getDOM(),
            this.itemContainer = <div style={{"flex-grow": "1", "overflow-y": "auto"}}></div>,
            motifButton,
            gmotifButton,
            spacerButton
        )
    }
    protected displayData(data: IndexItem[]): void {
        JSXFactory.render(this.itemContainer,
            ...data.map((x) => {
                const box = Box({
                    size: 10,
                    fill: (x.kind === ElementKind.Spacer) ? "white" : x.color,
                    stroke: (x.kind === ElementKind.Spacer) ? "black" : x.color,
                });
                const btn = (
                    <button
                        style={{
                            'display': "flex",
                            "flex-direction": "row",
                            'width': "100%"
                        }}
                    >
                        <span style={{ "flex-grow": "0" }}>{box}</span>
                        <span style={{ "flex-grow": "1" }}>{x.name}</span>
                        <span style={{ "flex-grow": "0" }}>({x.useCount})</span>
                    </button>
                );
                btn.addEventListener("click", () => {
                    this.send({
                        kind: "focus",
                        name: x.name
                    })
                })
                return btn;
            })
        )
    }
}