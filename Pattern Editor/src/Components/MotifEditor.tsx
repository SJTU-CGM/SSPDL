import * as JSXFactory from "../JSX/HTMLFactory";

import { Editor, Viewer, Controllee } from "../Widget/Widget";
import { StringEditor } from "../Widget/StringEditor";
import { PWM, Distribution, Alphabet, CodeDistribution } from "../SSPDL/SSPDL";
import * as SeqLogo from "@baliga-lab/sequencelogo.js";
import { later } from "../JSUtility";
import { ColorEditor } from "../Widget/ColorEditor";
import { DistributionEditor } from "./DistributionEditor";
import { NumberEditor } from "../Widget/NumberEditor";
import { Button, ButtonCmd } from "../Widget/Button";
import { popup, ask } from "../Widget/Utility";
import { PWMEditor } from "./PWMEditor";


interface Motif {
    color: string;
    matrix: PWM;
}


interface MotifEditorMinorData { alphabet: Alphabet; background: CodeDistribution; }
export class MotifEditor extends Editor<Motif, MotifEditorMinorData> {
    colorEr: ColorEditor;
    pwmEr: PWMEditor;
    init() {
        this.colorEr = new ColorEditor();
        this.pwmEr = new PWMEditor();
        JSXFactory.render(this.getDOM(),
            <label>Color: {this.colorEr.getDOM()}</label>,
            <label>PWM:{this.pwmEr.getDOM()}</label>
        )
        this.colorEr.register(this, (data) => {
            this.emitDataChange()
        })
        this.pwmEr.register(this, (data) => {
            this.emitDataChange()
        })
    }
    displayData(data: Motif, minor: MotifEditorMinorData): void {
        this.colorEr.initData(data.color, undefined);
        this.pwmEr.initData(data.matrix, {
            alphabet: minor.alphabet,
            background: minor.background
        });
    }
    getMajorData(): Motif {
        return {
            color: this.colorEr.getMajorData(),
            matrix: this.pwmEr.getMajorData()
        };
    }
}


interface GMotif {
    distribution: Distribution;
    color: string;
    matrix: PWM;
}


export class GMotifEditor extends Editor<GMotif, MotifEditorMinorData> {
    distEr: DistributionEditor;
    colorEr: ColorEditor;
    pwmEr: PWMEditor;
    init() {
        super.init();
        this.distEr = new DistributionEditor();
        this.colorEr = new ColorEditor();
        this.pwmEr = new PWMEditor();
        JSXFactory.render(this.getDOM(),
            <label>Color: {this.colorEr.getDOM()}</label>,
            <label>PWM:{this.pwmEr.getDOM()}</label>,
            <label>Distribution of #repetition:{this.distEr.getDOM()}</label>
        )
        const emitChange = () => this.emitDataChange()
        this.distEr.register(this, emitChange)
        this.colorEr.register(this, emitChange)
        this.pwmEr.register(this, emitChange)
    }
    displayData(data: GMotif, minor: MotifEditorMinorData): void {
        this.distEr.initData(data.distribution, undefined);
        this.colorEr.initData(data.color, undefined);
        this.pwmEr.initData(data.matrix, {
            alphabet: minor.alphabet,
            background: minor.background
        });
    }
    getMajorData(): GMotif {
        return {
            distribution: this.distEr.getMajorData(),
            color: this.colorEr.getMajorData(),
            matrix: this.pwmEr.getMajorData()
        };
    }
}
