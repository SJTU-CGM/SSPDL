import * as JSXFactory from "../JSX/HTMLFactory";

import { Editor, Controllee, Viewer, Controller } from "../Widget/Widget";
import { Distribution } from "../SSPDL/SSPDL";
import { StringEditor } from "../Widget/StringEditor";
import { StringViewer } from "../Widget/StringViewer";
import { Button, ButtonCmd } from "../Widget/Button";
import { HPile } from "../Widget/Pile";
import Snap = require("snapsvg");
import { later, format, sum, floatEqual, equal } from "../JSUtility";
import { tell, ask } from "../Widget/Utility";
import { DistributionViewer } from "./DistributionViewer";
import { NumberEditor } from "../Widget/NumberEditor";
import { CSV } from "../CSV";
import { Wrapper } from "../Widget/Wrapper";


export class DistributionEditor extends Editor<Distribution, void> {
    private viewer: DistributionViewer;
    init(): void {
        this.viewer = new DistributionViewer();
        JSXFactory.render(this.getDOM(), this.viewer.getDOM())
        this.viewer.bind({
            handle: (cmd) => {
                const ed = new DEditor();
                ed.initData(this.getMajorData(), undefined);
                ask(ed, {
                    ok: () => {
                        const newData = ed.getMajorData();
                        if (newData.probs.every((n) => { return 0 <= n && n <= 1; }) && floatEqual(sum(...newData.probs), 1)) {
                            this.updateMajorData(newData);
                        } else {
                            console.log(newData)
                            alert("invalid distribution: either some probability is out of [0,1] or their sum does not equal to 1.");
                        }
                    },
                    cancel: () => {
                    }
                });
            }
        })
    }
    getMajorData(): Distribution {
        return this.viewer.getData();
    }
    displayData(data: Distribution): void {
        this.viewer.initData(data);
    }
}


class DEditor extends Editor<Distribution, void> {
    private fromEr: NumberEditor;
    private probsEr: ProbsEditor;
    protected init(): void {
        super.init();
    }
    protected makeContainer(): HTMLElement {
        return <div style={{"display": "flex", "flex-direction": "column"}}></div>
    }
    public getMajorData(): Distribution {
        return {
            from: this.fromEr.getMajorData(),
            probs: this.probsEr.getMajorData()
        };
    }
    protected displayData(data: Distribution): void {
        this.fromEr = new NumberEditor();
        this.fromEr.initData(data.from, {
            min: 1,
            step: 1
        });
        this.fromEr.register(this, (d) => {
            this.probsEr.updateMinorData({
                from: d
            });
        })
        this.probsEr = new ProbsEditor();
        this.probsEr.initData(data.probs, {
            from: data.from
        });

        let csvButton = <button>To/From CSV</button>
        csvButton.addEventListener("click", () => {
            let probs = this.probsEr.getMajorData()
            let csvText = CSV.dump({ head: [ "Pr" ], body: probs.map((p)=>({ "Pr": p })) })

            const textarea = <textarea cols="30" rows="10"></textarea> as HTMLTextAreaElement;
            textarea.value = csvText;
            ask(new Wrapper(textarea), {
                cancel: () => {},
                ok: () => {
                    let tab = CSV.parse(textarea.value)
                    if (equal(tab.head, ["Pr"])) {
                        let probs = tab.body.map((r)=>(r["Pr"]))
                        this.probsEr.updateMajorData(probs)
                    }
                }
            })
        })

        JSXFactory.render(this.getDOM(),
            <label style={{"margin-bottom": "1ex"}}>From: {this.fromEr.getDOM()}</label>,
            this.probsEr.getDOM(),
            csvButton
        )
    }
}


type Probs = number[];
class ProbsEditor extends Editor<Probs, { from: number }> implements Controllee<ButtonCmd> {
    handle(cmd: ButtonCmd): void {
        switch (cmd.message) {
            case "add-row": {
                const data = this.getMajorData()
                this.updateMajorData([...data, 0]);
                return;
            }
            case "del-row": {
                const data = this.getMajorData()
                this.updateMajorData((data.length > 0) ? data.slice(0, data.length - 1) : [])
                return;
            }
        }
    }
    private editors: NumberEditor[] = [];
    private addRowButton: Button;
    private delRowButton: Button;
    protected makeContainer(): HTMLElement {
        return <div style={{"display": "flex", "flex-direction": "column"}}></div>
    }
    init(): void {
        super.init();

        this.addRowButton = new Button();
        this.addRowButton.initData({
            label: "+",
            message: "add-row"
        });
        this.addRowButton.bind(this);

        this.delRowButton = new Button();
        this.delRowButton.initData({
            label: "-",
            message: "del-row"
        });
        this.delRowButton.bind(this)
    }
    getMajorData(): Probs {
        return this.editors.map((e) => { return e.getMajorData(); });
    }
    displayData(data: Probs, minor: { from: number }): void {
        this.editors = []
        for (let i = 0; i < data.length; i++) {
            const ed = new NumberEditor()
            ed.initData(data[i], {
                min: 0,
                max: 1,
                step: 0.001
            });
            this.editors.push(ed);
        }
        const pile = new HPile();
        pile.setChildren([this.addRowButton, this.delRowButton]);
        JSXFactory.render(this.getDOM(),
            ...this.editors.map((e, i) => (<label>{minor.from+i}: {e.getDOM()}</label>)),
            <div style={{"padding-top": "1ex"}}>{pile.getDOM()}</div>
        )
    }
}