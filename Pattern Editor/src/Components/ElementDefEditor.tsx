import * as JSXFactory from "../JSX/HTMLFactory";

import { ElementDef, Alphabet, CodeDistribution, ElementKind } from "../SSPDL/SSPDL";
import { Editor } from "../Widget/Widget";
import { GMotifEditor, MotifEditor } from "./MotifEditor";
import { SpacerEditor } from "./SpacerEditor";


interface ElementDefEditorMinorData {
    alphabet: Alphabet
    background: CodeDistribution
}





export class ElementDefEditor extends Editor<ElementDef | null, ElementDefEditorMinorData> {
    private editor: MotifEditor | GMotifEditor | SpacerEditor;
    protected displayData(data: ElementDef | null, extra: ElementDefEditorMinorData): void {
        const makeEditor = (def: ElementDef, alphabet: Alphabet, background: CodeDistribution) => {
            switch (def.kind) {
                case ElementKind.Motif: {
                    // editor
                    const ed = new MotifEditor()
                    ed.initData(def, {
                        alphabet: alphabet,
                        background: background
                    })
                    ed.register(this, (newMotif) => {
                        const data: ElementDef = {
                            kind: ElementKind.Motif,
                            color: newMotif.color,
                            matrix: newMotif.matrix
                        }
                        this.updateMajorData(data)
                    })
                    return ed
                }
                case ElementKind.GMotif: {
                    // editor
                    const ed = new GMotifEditor()
                    ed.initData(def, {
                        alphabet: alphabet,
                        background: background
                    })
                    ed.register(this, (newGMotif) => {
                        const data: ElementDef = {
                            kind: ElementKind.GMotif,
                            color: newGMotif.color,
                            matrix: newGMotif.matrix,
                            distribution: newGMotif.distribution
                        }
                        this.updateMajorData(data)
                    })
                    return ed
                }
                case ElementKind.Spacer: {
                    // editor
                    const ed = new SpacerEditor()
                    ed.initData(def, undefined)
                    ed.register(this, (newSpacer) => {
                        const data: ElementDef = {
                            kind: ElementKind.Spacer,
                            distribution: newSpacer.distribution
                        }
                        this.updateMajorData(data)
                    })
                    return ed
                }
                default: {
                    throw new Error("internal")
                }
            }
        }

        if (data === null) {
            JSXFactory.render(this.getDOM())
        } else {
            const ed = makeEditor(data, extra.alphabet, extra.background)
            JSXFactory.render(
                this.getDOM(),
                <div style={{ "padding-left": "1em", "padding-top": "1ex" }}>
                    {ed.getDOM()}
                </div>
            )
        }
    }
}