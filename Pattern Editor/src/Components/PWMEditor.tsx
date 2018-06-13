import * as JSXFactory from "../JSX/HTMLFactory";

import { Editor, Controllee, Viewer } from "../Widget/Widget";
import { ButtonCmd, Button } from "../Widget/Button";
import { PWM, Alphabet, CodeDistribution } from "../SSPDL/SSPDL";
import { NumberEditor } from "../Widget/NumberEditor";
import { ask, tell } from "../Widget/Utility";
import { later, copy, zip2, min, floatEqual, equal } from "../JSUtility";
import * as SeqLogo from "@baliga-lab/sequencelogo.js";
import { CSV } from "../CSV";
import { Wrapper } from "../Widget/Wrapper";
import { StringEditor } from "../Widget/StringEditor";





class PEditor extends Editor<PWM, PWMEditorMinorData> implements Controllee<ButtonCmd> {
    handle(cmd: ButtonCmd): void {
        const handleFromConsensus = () => {
            let ed = new StringEditor()
            ed.initData("", undefined);
            ask(ed, {
                cancel: () => {},
                ok: () => {
                    let newData = [];
                    let alphabet = this.getMinorData().alphabet;
                    for (let ch of ed.getMajorData()) {
                        let d: { [key: string]: number } = {}
                        if (alphabet.indexOf(ch) >= 0) {
                            for (let code of alphabet) {
                                d[code] = (code == ch) ? 1 : 0;
                            }
                        } else {
                            for (let code of alphabet) {
                                d[code] = 1 / alphabet.length;
                            }
                        }
                        newData.push(d)
                    }
                    this.updateMajorData(newData)
                }
            })
        }
        switch (cmd.message) {
            case "add-row": {
                const data: PWM = this.getMajorData();
                this.updateMajorData(data.concat([copy(this.getMinorData().background)]));
                return
            }
            case "del-row": {
                const data: PWM = this.getMajorData();
                this.updateMajorData(data.slice(0, data.length - 1));
                return
            }
            case "csv": {
                const alpha = this.getMinorData().alphabet;
                const data = this.getMajorData();
                const csvText = CSV.dump({ head: alpha, body: data })

                const textarea = <textarea cols="30" rows="10"></textarea> as HTMLTextAreaElement;
                textarea.value = csvText;
                ask(new Wrapper(textarea), {
                    ok: () => {
                        const csv = CSV.parse(textarea.value);
                        console.log("ehhhh?", csv);

                        if (equal(csv.head, alpha)) {
                            this.updateMajorData(csv.body)
                        } else {
                            alert("You must not change the header.")
                        }
                    },
                    cancel: () => { }
                })
                return;
            }
            case "consensus": {
                handleFromConsensus();
                return;
            }
        }
    }
    private editorMaps: { [key: string]: NumberEditor }[];
    displayData(data: PWM, minor: PWMEditorMinorData): void {
        // To/From CSV
        const csvButton = new Button();
        csvButton.initData({
            label: "To/From CSV",
            message: "csv"
        });
        csvButton.bind(this);

        // From Consensus
        const cssButton = new Button();
        cssButton.initData({
            label: "From consensus",
            message: "consensus"
        })
        cssButton.bind(this)

        // add/delete row
        const addRowBtn = new Button();
        const deleteRowBtn = new Button();
        addRowBtn.initData({
            label: "+",
            message: "add-row"
        })
        deleteRowBtn.initData({
            label: "-",
            message: "del-row"
        })
        addRowBtn.bind(this);
        deleteRowBtn.bind(this);

        this.editorMaps = []
        for (const row of data) {
            const editorMap: { [key: string]: NumberEditor } = {}
            for (const code of minor.alphabet) {
                const e = new NumberEditor();
                e.initData(
                    row[code],
                    {
                        min: 0,
                        max: 1,
                        step: 0.001
                    }
                );
                editorMap[code] = e
            }
            this.editorMaps.push(editorMap)
        }
        JSXFactory.render(this.getDOM(),
            <div>
                <table>
                    <tr>
                        {minor.alphabet.map((b) => (<th style={{ width: "6em" }}>{b}</th>))}
                    </tr>
                    {
                        this.editorMaps.map((table) => (
                            <tr>
                                {
                                    minor.alphabet.map((code) => {
                                        return <td style={{ width: "6em" }}>{table[code].getDOM()}</td>
                                    })
                                }
                            </tr>
                        ))
                    }
                    <tr>
                        <td colspan="2">{addRowBtn.getDOM()}</td>
                        <td colspan="2">{deleteRowBtn.getDOM()}</td>
                    </tr>
                </table>
                {csvButton.getDOM()}
                {cssButton.getDOM()}
            </div>
        );
    }
    getMajorData(): PWM {
        return this.editorMaps.map((table) => {
            const d: CodeDistribution = {}
            for (const code of Object.keys(table)) {
                d[code] = table[code].getMajorData()
            }
            return d;
        })
    }
}


interface PWMEditorMinorData { alphabet: Alphabet, background: CodeDistribution }


function validatePWM(alphabet: Alphabet, pwm: PWM) {
    pwm.forEach((record, rowIndex) => {
        let sum = 0;
        for (const symbol of alphabet) {
            const p = record[symbol];
            if (!(0 <= p && p <= 1)) {
                throw Error("The probability at (" + rowIndex + "," + symbol + ") out of range.");
            }
            sum += p;
        }
        if (!floatEqual(sum, 1)) {
            throw Error("Row#" + (rowIndex+1) + " sums up to " + sum + " (1 expected).")
        }
    })
}


export class PWMEditor extends Editor<PWM, PWMEditorMinorData> {
    private viewer: SeqLogoViewer;
    protected init() {
        super.init();
        this.viewer = new SeqLogoViewer();
        const content = <div>{this.viewer.getDOM()}</div>
        content.addEventListener("click", () => {
            const ed = new PEditor();
            ed.initData(this.getMajorData(), this.getMinorData())
            ask(ed, {
                ok: () => {
                    const newData = ed.getMajorData();
                    try {
                        validatePWM(this.getMinorData().alphabet, newData);
                        this.updateMajorData(newData);
                    }
                    catch (e) {
                        alert("Invalid pwm: " + e.message);
                    }
                },
                cancel: () => { }
            })
        })

        JSXFactory.render(this.getDOM(), content);
    }
    protected displayData(data: PWM, minor: PWMEditorMinorData): void {
        this.viewer.initData({
            alphabet: minor.alphabet,
            pwm: data
        });
    }
}


interface SeqLogoData {
    pwm: PWM;
    alphabet: Alphabet;
}
class SeqLogoViewer extends Viewer<SeqLogoData> {
    static count = 0;
    static newID(): string {
        SeqLogoViewer.count++;
        return "motif-viewer-canvas" + SeqLogoViewer.count.toString();
    }
    private id: string;
    init() {
        super.init()
        this.id = SeqLogoViewer.newID();
        const logoEl = <div id={this.id}></div>
        JSXFactory.render(this.getDOM(), logoEl);
    }
    displayData(data: SeqLogoData): void {

        const transformMotif = (alphabet: Alphabet, pwm: PWM): SeqLogo.PSSM => {
            return {
                alphabet: alphabet,
                values: pwm.map((row) => alphabet.map((code) => row[code]))
            };
        }
        later(() => {
            SeqLogo.makeLogo(this.id, transformMotif(data.alphabet, data.pwm), {});
        })
    }
}
