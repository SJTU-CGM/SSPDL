import { Editor } from "./Widget/Widget";
import { HTML } from "./html";
import { StringEditor } from "./Widget/StringEditor";
import { DistributionEditor } from "./DistributionEditor";
import { Distribution } from "./SMDL/SMDL";


interface Spacer {
    distribution: Distribution;
};


export class SpacerEditor extends Editor<Spacer> {
    distEd: DistributionEditor;
    constructor(container: HTMLElement) {
        super(container);
        const nameEdEl = HTML.box();
        const distEdEl = HTML.box();
        const distEd = new DistributionEditor(distEdEl);
        this.distEd = distEd;
        HTML.build({
            p: container,
            ch: [ this.distEd.getDOM() ]
        });
    }
    displayData(container: HTMLElement, data: Spacer): void {
        this.distEd.setData(data.distribution);
    }
    getData(): Spacer {
        return {
            distribution: this.distEd.getData()
        };
    }
}