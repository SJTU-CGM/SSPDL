import * as JSXFactory from "../JSX/SVGFactory";
import { Controller } from "../Widget/Widget";
import { Distribution } from "../SSPDL/SSPDL";
import { format } from "../JSUtility";


export class DistributionViewer extends Controller<Distribution, "click"> {
    private svg: SVGSVGElement;
    init(): void {
        super.init();
        this.svg = (
            <svg
                height="0"
                width="0"
                style={{
                    "stroke": "black",
                    "fill": "white"
                }}
            />
        ) as SVGSVGElement;
        this.svg.addEventListener("click", () => {
            this.send("click");
        })
        this.getDOM().innerHTML = "";
        this.getDOM().appendChild(this.svg);
    }
    displayData(data: Distribution): void {
        const contentHeight = 100;
        const unitWidth = 30;
        const topPadding = 20;
        const bottomPadding = 20;
        const leftPadding = 10;
        const rightPadding = 10;
        const height = contentHeight + topPadding + bottomPadding;

        const heightProbRatio = contentHeight / Math.max(0, ...data.probs);
        const width = leftPadding + unitWidth * data.probs.length + rightPadding;

        this.svg.setAttribute('width', width.toString())
        this.svg.setAttribute('height', height.toString())

        JSXFactory.render(this.svg,
            ...data.probs.map((p, i) => {
                const index = data.from + i;
                const h = p * heightProbRatio;
                const w = unitWidth;
                const top = topPadding + contentHeight;
                const left = leftPadding + unitWidth * i;
                const label = p.toFixed(2);
                return (
                    <g transform={format("translate(%,%)", left, top)}>
                        <rect x={0} y={-h} width={w} height={h} fill="lightblue" stroke="white" />
                        <text
                            x={unitWidth / 2}
                            y={-h}
                            fill="black"
                            stroke="black"
                            dominant-baseline="baseline"
                            text-anchor="middle"
                            pointer-events="none"
                            font-size="0.6em"
                        >
                            {label}
                        </text>
                        <text
                            x={unitWidth / 2}
                            y={0}
                            fill="black"
                            stroke="black"
                            dominant-baseline="hanging"
                            text-anchor="middle"
                            pointer-events="none"
                        >
                            {index}
                        </text>
                    </g >
                )
            }),
            <line
                x1={0}
                y1={topPadding + contentHeight}
                x2={width}
                y2={topPadding + contentHeight}
                stroke="black"
                fill="black"
            />
        );
    }
}