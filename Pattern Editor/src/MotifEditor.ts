import { Editor, Viewer } from "./Widget/Widget";
import { StringEditor } from "./Widget/StringEditor";
import { PWM, Distribution } from "./SMDL/SMDL";
import { HTML } from "./html";
import * as SeqLogo from "@baliga-lab/sequencelogo.js";
import { later } from "./utility/JSUtility";
import { ColorEditor } from "./Widget/ColorEditor";
import { DistributionEditor } from "./DistributionEditor";


interface Motif {
    color: string;
    matrix: PWM;
}


class PWMEditor extends Editor<PWM> {
    private tableEl: HTMLTableElement;
    displayData(container: HTMLElement, data: PWM): void {

        const buildTable = (pwm: PWM): HTMLTableElement => {
            const el = HTML.element("table", {
                "class": "w3-table-all w3-centered"
            });
            el.addEventListener("input", ()=>{
                this.emitDataChange();
            })
            const thEl = HTML.build({
                p: HTML.element("tr"),
                ch: ["A", "C", "G", "T"].map((n) => HTML.build({
                    p: HTML.element("th"),
                    ch: [n]
                }))
            });
            const rows = [];
            for (const r of pwm) {
                rows.push(HTML.build({
                    p: HTML.element("tr"),
                    ch: [r.A, r.C, r.G, r.T].map((n) => HTML.build({
                        p: HTML.element("td", {
                            "contenteditable": "true"
                        }),
                        ch: [n.toFixed(3)]
                    }))
                }));
            }
            const addRowBtn = HTML.element("div", {
                "class": "w3-button"
            }, { "display": "block" }, ["+"]);
            const delRowBtn = HTML.element("div", {
                "class": "w3-button"
            }, { "display": "block" }, ["-"]);
            const buttonRow = HTML.element("tr", {}, {}, [
                HTML.element("td", { "colspan": "2" }, { "padding": "0" }, [addRowBtn]),
                HTML.element("td", { "colspan": "2" }, { "padding": "0" }, [delRowBtn]),
            ]);
            addRowBtn.addEventListener("click", () => {
                const data: PWM = this.getData();
                this.setData(data.concat([{
                    A: 0.25,
                    C: 0.25,
                    G: 0.25,
                    T: 0.25,
                }]));
            });
            delRowBtn.addEventListener("click", () => {
                const data: PWM = this.getData();
                this.setData(data.slice(0, data.length-1));
            });
            return HTML.build({
                p: el,
                ch: [thEl].concat(rows, [buttonRow])
            }) as HTMLTableElement;
        }
        this.tableEl = buildTable(data);
        HTML.inner(container, [this.tableEl]);
    }
    getData(): PWM {
        const rows = this.tableEl.rows;
        const pwm: PWM = [];
        for (let i = 1;  i < rows.length-1; i++) {
            // overlook header and button row
            pwm.push({
                A: parseFloat(rows[i].cells[0].innerText),
                C: parseFloat(rows[i].cells[1].innerText),
                G: parseFloat(rows[i].cells[2].innerText),
                T: parseFloat(rows[i].cells[3].innerText)
            });
        }
        return pwm;
    }
}


class SeqLogoViewer extends Viewer<PWM> {
    static count = 0;
    static newID(): string {
        SeqLogoViewer.count ++;
        return "motif-viewer-canvas" + SeqLogoViewer.count.toString();
    }
    private id: string;
    constructor(container: HTMLElement) {
        super(container);
        this.id = SeqLogoViewer.newID();
        const logoEl = HTML.element("div", { "id": this.id });
        HTML.inner(container, [logoEl]);
    }
    displayData(container: HTMLElement, data: PWM): void {

        function transformMotif(pwm: PWM): SeqLogo.PSSM {
            return {
                alphabet: ["A", "C", "G", "T"],
                values: pwm.map((v) => [v.A, v.C, v.G, v.T])
            };
        }
        SeqLogo.makeLogo(this.id, transformMotif(data), {});
    }
}


export class MotifEditor extends Editor<Motif> {
    colorEr: ColorEditor;
    pwmEr: PWMEditor;
    seqlogoVr: SeqLogoViewer;
    constructor(container: HTMLElement) {
        super(container);
        this.colorEr = new ColorEditor(HTML.box(), "Color");
        this.pwmEr = new PWMEditor(HTML.box());
        this.seqlogoVr = new SeqLogoViewer(HTML.box());
        HTML.inner(container, [this.colorEr.getDOM(), "PWM:", this.pwmEr.getDOM(), this.seqlogoVr.getDOM()]);
        this.pwmEr.registerHandler((data)=>{
            this.seqlogoVr.setData(data);
        })
    }
    displayData(container: HTMLElement, data: Motif): void {
        this.colorEr.setData(data.color);
        this.pwmEr.setData(data.matrix);
        this.seqlogoVr.setData(data.matrix);
    }
    getData(): Motif {
        return {
            color: this.colorEr.getData(),
            matrix: this.pwmEr.getData()
        };
    }
}


interface GMotif {
    distribution: Distribution;
    color: string;
    matrix: PWM;
}


export class GMotifEditor extends Editor<GMotif> {
    distEr: DistributionEditor;
    colorEr: ColorEditor;
    pwmEr: PWMEditor;
    seqlogoVr: SeqLogoViewer;
    constructor(container: HTMLElement) {
        super(container);
        this.distEr = new DistributionEditor();
        this.colorEr = new ColorEditor(HTML.box(), "Color");
        this.pwmEr = new PWMEditor(HTML.box());
        this.seqlogoVr = new SeqLogoViewer(HTML.box());
        HTML.inner(container, [this.distEr.getDOM(), this.colorEr.getDOM(), "PWM:", this.pwmEr.getDOM(), this.seqlogoVr.getDOM()]);
        this.pwmEr.registerHandler((data)=>{
            this.seqlogoVr.setData(data);
        })
    }
    displayData(container: HTMLElement, data: GMotif): void {
        this.distEr.setData(data.distribution);
        this.colorEr.setData(data.color);
        this.pwmEr.setData(data.matrix);
        this.seqlogoVr.setData(data.matrix);
    }
    getData(): GMotif {
        return {
            distribution: this.distEr.getData(),
            color: this.colorEr.getData(),
            matrix: this.pwmEr.getData()
        };
    }
}
