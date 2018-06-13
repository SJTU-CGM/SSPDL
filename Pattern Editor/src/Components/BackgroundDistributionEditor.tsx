import * as JSXFactory from "../JSX/HTMLFactory";


import { CodeDistribution, Alphabet } from "../SSPDL/SSPDL";
import { Editor } from "../Widget/Widget";
import { popup, ask } from "../Widget/Utility";
import { NumberEditor } from "../Widget/NumberEditor";
import { zip2, sum, min } from "../JSUtility";


export class BackgroundDistributionEditor extends Editor<CodeDistribution, { alphabet: Alphabet }> {
    protected makeContainer(): HTMLElement {
        return (
            <div
                style={{
                    "border-bottom": "1px solid black",
                    "display": "flex",
                    "flex-direction": "row",
                    "padding-left": "0.5ex",
                    "padding-right": "0.5ex"
                }}
            ></div>
        )
    }
    protected displayData(data: CodeDistribution, minor: { alphabet: Alphabet }): void {
        const alphabet = minor.alphabet
        const content = alphabet.map((code) => {
            return (
                <span><strong>{code}</strong>: {data[code]}; </span>
            )
        })
        const btn = <span style={{"color": "blue", cursor: "pointer"}}>Edit</span>
        JSXFactory.render(this.getDOM(),
            (<span>Background Distribution: </span>),
            <span style={{ "flex-grow": "1" }}>{content}</span>,
            btn
        )
        btn.addEventListener("click", () => {
            const ed = new BEditor()
            ed.initData(data, minor)
            ask(ed, {
                cancel: () => { },
                ok: () => {
                    const d = ed.getMajorData()
                    if (sum(...alphabet.map((code) => d[code])) === 1) {
                        this.updateMajorData(ed.getMajorData())
                    } else {
                        alert("Invalid background distribution")
                    }
                }
            })
        })
    }
}



class BEditor extends Editor<CodeDistribution, { alphabet: Alphabet; }> {
    private editorTable: { [key: string]: NumberEditor }
    protected makeContainer() { return <table /> }
    protected displayData(data: CodeDistribution, minor: { alphabet: Alphabet; }): void {
        const alphabet = minor.alphabet;
        // create editors
        const editorTable: { [key: string]: NumberEditor } = {}
        for (const code of alphabet) {
            editorTable[code] = new NumberEditor()
        }
        // build dom
        const doms = []
        for (const code of alphabet) {
            doms.push(
                <tr><td>{code}</td><td>{editorTable[code].getDOM()}</td></tr>
            )
        }
        const header = <tr><th>Code</th><th>Probability</th></tr>
        JSXFactory.render(this.getDOM(), header, ...doms)
        // initialize data
        for (const code of alphabet) {
            const ed = editorTable[code]
            ed.initData(data[code], {
                min: 0,
                max: 1,
                step: 0.001
            })
        }
        // others
        this.editorTable = editorTable
    }
    public getMajorData() {
        const dist: CodeDistribution = {}
        for (const code of Object.keys(this.editorTable)) {
            dist[code] = this.editorTable[code].getMajorData()
        }
        return dist;
    }
}