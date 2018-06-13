import * as JSXFactory from "../JSX/HTMLFactory";

import { Editor } from "../Widget/Widget";
import { DistributionEditor } from "./DistributionEditor";
import { Distribution } from "../SSPDL/SSPDL";


interface Spacer {
    distribution: Distribution;
};


export class SpacerEditor extends Editor<Spacer, void> {
    distEd: DistributionEditor;
    init() {
        super.init()
        this.distEd = new DistributionEditor();
        this.distEd.register(this, () => this.emitDataChange())
        JSXFactory.render(this.getDOM(),
            <label>Length distribution: {this.distEd.getDOM()}</label>
        )
    }
    displayData(data: Spacer): void {
        this.distEd.initData(data.distribution, undefined);
    }
    getMajorData(): Spacer {
        return {
            distribution: this.distEd.getMajorData()
        };
    }
}