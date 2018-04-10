import {HTML} from "../html";

export {};


interface HistogramData {
    labels: string[];
    values: number[];
}


interface HistogramStyle {
    height: number;
    width: number;
}


function drawHistogram(container: SVGElement, data: HistogramData, style: HistogramStyle = { height: 100, width: 100 }): void {
    // clear content
    container.innerHTML = "";
    container.setAttribute("height", style.height + "px");
    container.setAttribute("width", style.width + "px");
    // vertical axis
    const maxFreq = Math.max(...data.values);
    const hUnit = style.height / maxFreq;
    HTML.e({
        tag: "path",
        attr: {
            "d": ""
        }
    })
    // horizontal axis

    // bars
}